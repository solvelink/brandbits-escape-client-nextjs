import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

export const Map = ({ className }: { className?: string }) => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN!;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: "mapbox://styles/teunj/clvmfjsng01is01qphupsa191",
    });

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

    return () => {
      mapRef.current!.remove();
    };
  }, []);

  return <div id="map-container" className={className} ref={mapContainerRef} />;
};
