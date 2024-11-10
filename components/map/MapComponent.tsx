import { Feature } from "ol";
import Map from "ol/Map";
import View from "ol/View";
import { defaults as defaultControls } from "ol/control";
import { Point } from "ol/geom";
import { defaults as defaultInteractions } from "ol/interaction";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import "ol/ol.css";
import { fromLonLat, toLonLat } from "ol/proj"; // Import both functions
import { Vector as VectorSource } from "ol/source";
import OSM from "ol/source/OSM";
import { Icon, Style } from "ol/style";
import React, { useEffect, useRef, useState } from "react";

interface MapComponentProps {
  onLocationSelect?: React.Dispatch<
    React.SetStateAction<{ lat: number; lon: number }>
  >;
  defaultPosition?: { lat: number; lon: number };
  disableInteractions?: boolean; // Flag to disable interactions
}

const MapComponent: React.FC<MapComponentProps> = ({
  onLocationSelect,
  defaultPosition,
  disableInteractions = false, // Default is false (interactions enabled)
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
              : [0, 0]
          ),
          zoom: 12,
        }),
        controls: defaultControls({
          attributionOptions: {
            collapsible: true,
          },
        }),
        interactions: disableInteractions
          ? [] // Disable all interactions
          : defaultInteractions(), // Enable default interactions
      });

      // Add default marker if provided
      if (defaultPosition) {
        const defaultCoords = fromLonLat([
          defaultPosition.lon,
          defaultPosition.lat,
        ]);

        const defaultMarker = new Feature({
          geometry: new Point(defaultCoords),
        });

        defaultMarker.setStyle(
          new Style({
            image: new Icon({
              src: "/marker.png",
              anchor: [0.5, 1],
            }),
          })
        );

        const vectorSource = new VectorSource({
          features: [defaultMarker],
        });

        const vectorLayer = new VectorLayer({
          source: vectorSource,
        });

        initialMap.addLayer(vectorLayer);
      }

      // Click interaction for selecting location
      if (!disableInteractions) {
        initialMap.on("singleclick", function (evt) {
          const coords = evt.coordinate;
          const lonLat = toLonLat(coords); // Correctly convert to lon/lat
          const [lon, lat] = lonLat;

          const marker = new Feature({
            geometry: new Point(coords),
          });

          marker.setStyle(
            new Style({
              image: new Icon({
                src: "/marker.png",
                anchor: [0.5, 1],
              }),
            })
          );

          const vectorSource = new VectorSource({
            features: [marker],
          });

          const vectorLayer = new VectorLayer({
            source: vectorSource,
          });

          // Remove previous markers
          initialMap
            .getLayers()
            .getArray()
            .forEach((layer) => {
              if (layer instanceof VectorLayer) {
                initialMap.removeLayer(layer);
              }
            });

          initialMap.addLayer(vectorLayer);

          if (onLocationSelect) {
            onLocationSelect({ lon, lat });
          }
        });
      }

      setMap(initialMap);

      return () => initialMap.setTarget(undefined);
    }
  }, [onLocationSelect, defaultPosition, disableInteractions]);

  return (
    <div
      ref={mapRef}
      className="relative w-full h-full"
      style={{ cursor: "pointer" }}
    ></div>
  );
};

export default MapComponent;
