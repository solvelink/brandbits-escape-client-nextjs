"use client";

import { useRef, useEffect } from "react";
import mapboxgl, { MapOptions } from "mapbox-gl";
import { GameDefaultPage } from "@/types/game";
import { useGameStore, usePage } from "@/stores/gameStore";
import "mapbox-gl/dist/mapbox-gl.css";

const trimLineString = (
  lineString: GeoJSON.LineString,
  start: number,
  end: number
): GeoJSON.LineString => {
  return {
    ...lineString,
    coordinates: lineString.coordinates.slice(start, end),
  };
};

export const Map = ({ className }: { className?: string }) => {
  const game = useGameStore((state) => state.game);
  const page = usePage(game);

  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!game || !mapContainerRef.current) return;
    const pageData = page?.data as GameDefaultPage | undefined;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;
    const geoJson = JSON.parse(game.escape.mapGeojson);
    const options: MapOptions = {
      container: mapContainerRef.current!,
      style: game.escape.mapboxStyleUrl,
    };

    if (pageData?.mapType === "start") {
      options.center = [game.escape.mapStartLng, game.escape.mapStartLat];
      options.zoom = 14;
    } else {
      const coordinates = geoJson.coordinates;
      const bounds = new mapboxgl.LngLatBounds(
        [coordinates[0][0], coordinates[0][1]],
        [coordinates[0][0], coordinates[0][1]]
      );

      for (const coord of coordinates) {
        bounds.extend([coord[0], coord[1]]);
      }

      options.bounds = [
        [bounds.getWest(), bounds.getSouth()],
        [bounds.getEast(), bounds.getNorth()],
      ];
      options.fitBoundsOptions = {
        padding: 40,
      };
    }

    mapRef.current = new mapboxgl.Map(options);

    mapRef.current.addControl(new mapboxgl.NavigationControl());
    const geolocateControl = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserHeading: true,
    });
    mapRef.current.addControl(geolocateControl);

    mapRef.current.on("load", (event) => {
      geolocateControl.trigger();
      const isRange = pageData?.mapType === "range";

      const layers = event.target.getStyle().layers;
      let firstSymbolId;
      for (const layer of layers) {
        if (layer.type === "symbol") {
          firstSymbolId = layer.id;
          break;
        }
      }
      if (pageData?.mapType === "start") {
        event.target.loadImage("/start.png", (error, image) => {
          if (error) throw error;
          if (!image) throw new Error("Image not found");
          event.target.addImage("start-marker", image);

          event.target.addSource("start", {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: [
                      game.escape.mapStartLng,
                      game.escape.mapStartLat,
                    ],
                  },
                  properties: {},
                },
              ],
            },
          });

          event.target.addLayer({
            id: "points",
            type: "symbol",
            source: "start",
            layout: {
              "icon-image": "start-marker",
              "icon-size": 0.15,
              "icon-anchor": "bottom",
            },
          });
        });
      } else {
        event.target.addSource("FullLineString", {
          type: "geojson",
          data: isRange
            ? trimLineString(geoJson, 0, pageData.mapRangeEnd!)
            : geoJson,
        });

        event.target.addLayer(
          {
            id: "LineString",
            type: "line",
            source: "FullLineString",
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": "#E06757",
              "line-opacity": isRange ? 0.4 : 1,
              "line-width": 4,
            },
          },
          firstSymbolId
        );

        if (isRange) {
          event.target.addSource("TrimmedLineString", {
            type: "geojson",
            data: trimLineString(
              geoJson,
              pageData.mapRangeStart!,
              pageData.mapRangeEnd!
            ),
          });

          event.target.addLayer(
            {
              id: "TrimmedLineString",
              type: "line",
              source: "TrimmedLineString",
              layout: {
                "line-join": "round",
                "line-cap": "round",
              },
              paint: {
                "line-color": "#E06757",
                "line-width": 4,
              },
            },
            firstSymbolId
          );
        }
      }
    });

    return () => {
      mapRef.current!.remove();
    };
  }, [game]);

  return <div id="map-container" className={className} ref={mapContainerRef} />;
};
