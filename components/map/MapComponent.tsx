import React, { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import { Tile as TileLayer } from "ol/layer";
import { fromLonLat, toLonLat } from "ol/proj";
import OSM from "ol/source/OSM";
import { defaults as defaultControls } from "ol/control";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Point } from "ol/geom";
import { Feature } from "ol";
import { Icon, Style } from "ol/style";

interface MapComponentProps {
  onLocationSelect?: React.Dispatch<
    React.SetStateAction<{ lat: number; lon: number }>
  >;
  defaultPosition?: { lat: number; lon: number };
}

const MapComponent: React.FC<MapComponentProps> = ({
  onLocationSelect,
  defaultPosition,
}) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      const initialMap = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: fromLonLat(
            defaultPosition
              ? [defaultPosition.lon, defaultPosition.lat]
              : [0, 0] // Default to India's center
          ),
          zoom: 12,
        }),
        controls: defaultControls({
          attributionOptions: {
            collapsible: true,
          },
        }),
      });

      if (defaultPosition) {
        // Place a marker at the default position
        const defaultCoords = fromLonLat([
          defaultPosition.lon,
          defaultPosition.lat,
        ]);

        const defaultMarker = new Feature({
          geometry: new Point(defaultCoords),
        });

        // Create a marker style
        defaultMarker.setStyle(
          new Style({
            image: new Icon({
              src: "/marker.png",
              anchor: [0.5, 1],
            }),
          })
        );

        // Add the marker to a vector layer
        const vectorSource = new VectorSource({
          features: [defaultMarker],
        });

        const vectorLayer = new VectorLayer({
          source: vectorSource,
        });

        initialMap.addLayer(vectorLayer);
      }

      initialMap.on("singleclick", function (evt) {
        const coords = evt.coordinate;
        const lonLat = toLonLat(coords);
        const [lon, lat] = lonLat;

        // Place a marker at the clicked position
        const marker = new Feature({
          geometry: new Point(coords),
        });

        // Create a marker style
        marker.setStyle(
          new Style({
            image: new Icon({
              src: "/marker.png",
              anchor: [0.5, 1],
            }),
          })
        );

        // Add the marker to a vector layer
        const vectorSource = new VectorSource({
          features: [marker],
        });

        const vectorLayer = new VectorLayer({
          source: vectorSource,
        });

        // Clear previous markers and add the new one
        initialMap
          .getLayers()
          .getArray()
          .forEach((layer) => {
            if (layer instanceof VectorLayer) {
              initialMap.removeLayer(layer);
            }
          });

        initialMap.addLayer(vectorLayer);

        // Send the coordinates to the parent component
        if (onLocationSelect) {
          onLocationSelect({ lon, lat });
        }
      });

      setMap(initialMap);

      return () => initialMap.setTarget(undefined);
    }
  }, [onLocationSelect, defaultPosition]);

  return (
    <div
      ref={mapRef}
      style={{ width: "100%", height: "400px", cursor: "pointer" }}
    ></div>
  );
};

export default MapComponent;
