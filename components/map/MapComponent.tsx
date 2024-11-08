import { Feature } from "ol";
import Map from "ol/Map";
import View from "ol/View";
import { defaults as defaultControls } from "ol/control";
import { Point } from "ol/geom";
import { defaults as defaultInteractions } from "ol/interaction";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import "ol/ol.css";
import { fromLonLat, toLonLat } from "ol/proj";
import { Vector as VectorSource } from "ol/source";
import OSM from "ol/source/OSM";
import { Icon, Style } from "ol/style";
import React, { useEffect, useRef, useState } from "react";
import { Extent, boundingExtent } from "ol/extent";

interface MapComponentProps {
  onLocationSelect?: React.Dispatch<
    React.SetStateAction<{ lat: number; lon: number }>
  >;
  defaultPosition?: { lat: number; lon: number };
  disableInteractions?: boolean;
  properties?: { id: number; lat: number; lon: number }[];
}

const MapComponent: React.FC<MapComponentProps> = ({
  onLocationSelect,
  defaultPosition,
  disableInteractions = false,
  properties = [],
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
          center: fromLonLat([0, 0]), // Default center, will adjust below
          zoom: 12,
        }),
        controls: defaultControls({
          attributionOptions: {
            collapsible: true,
          },
        }),
        interactions: disableInteractions ? [] : defaultInteractions(),
      });

      const addMarkersAndAdjustView = () => {
        const features = properties.map((property) => {
          const coords = fromLonLat([property.lon, property.lat]);

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

          return marker;
        });

        const vectorSource = new VectorSource({
          features,
        });

        const vectorLayer = new VectorLayer({
          source: vectorSource,
        });

        initialMap.addLayer(vectorLayer);

        // Calculate extent and fit view if there are properties
        if (properties.length > 0) {
          const coordinates = properties.map((p) => fromLonLat([p.lon, p.lat]));
          const extent: Extent = boundingExtent(coordinates);
          initialMap.getView().fit(extent, {
            padding: [50, 50, 50, 50], // Padding around the extent
            maxZoom: 10, // Prevents zooming in too far
          });
        }
      };

      addMarkersAndAdjustView();

      if (!disableInteractions) {
        initialMap.on("singleclick", function (evt) {
          const coords = evt.coordinate;
          const lonLat = toLonLat(coords);
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

          addMarkersAndAdjustView(); // Re-add property markers after clearing layers
          initialMap.addLayer(vectorLayer);

          if (onLocationSelect) {
            onLocationSelect({ lon, lat });
          }
        });
      }

      setMap(initialMap);

      return () => initialMap.setTarget(undefined);
    }
  }, [onLocationSelect, defaultPosition, disableInteractions, properties]);

  return (
    <div
      ref={mapRef}
      className="relative w-full h-full"
      style={{ cursor: "pointer" }}
    ></div>
  );
};

export default MapComponent;
