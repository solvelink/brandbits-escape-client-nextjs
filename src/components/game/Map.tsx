import { useRef, useEffect } from "react";
import mapboxgl, { MapOptions } from "mapbox-gl";
import useEscapeStore from "@/stores/escapeStore";

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
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const escapeStore = useEscapeStore();
  const currentPage = escapeStore.game?.pages[escapeStore.currentPage]?.data[0];

  useEffect(() => {
    const geoJson = JSON.parse(escapeStore.game.mapGeojson);
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN!;
    const options: MapOptions = {
      container: mapContainerRef.current!,
      style: escapeStore.game.mapboxStyleUrl,
    };
    if (currentPage.mapType === "start") {
      options.center = [
        escapeStore.game.mapStartLng,
        escapeStore.game.mapStartLat,
      ];
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
    mapRef.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      })
    );

    mapRef.current.on("load", (event) => {
      const isRange = currentPage.mapType === "range";

      const layers = event.target.getStyle().layers;
      let firstSymbolId;
      for (const layer of layers) {
        if (layer.type === "symbol") {
          firstSymbolId = layer.id;
          break;
        }
      }
      if (currentPage.mapType === "start") {
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
                      escapeStore.game.mapStartLng,
                      escapeStore.game.mapStartLat,
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
            ? trimLineString(geoJson, 0, currentPage.mapRangeEnd)
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

        if (currentPage.mapType === "range") {
          event.target.addSource("TrimmedLineString", {
            type: "geojson",
            data: trimLineString(
              geoJson,
              currentPage.mapRangeStart,
              currentPage.mapRangeEnd
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
  }, []);

  return <div id="map-container" className={className} ref={mapContainerRef} />;
};
