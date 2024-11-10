import { Feature } from "ol";
import Map from "ol/Map";
import View from "ol/View";
import Overlay from "ol/Overlay";
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
import { IPropertyLocationResponse } from "@/type/dto/property/property-dto";
import Link from "next/link"; // Import Link from Next.js

interface MapComponentProps {
  onLocationSelect?: React.Dispatch<
    React.SetStateAction<{ lat: number; lon: number }>
  >;
  defaultPosition?: { lat: number; lon: number };
  disableInteractions?: boolean;
  properties?: IPropertyLocationResponse[];
}

const MultiMapComponent: React.FC<MapComponentProps> = ({
  onLocationSelect,
  defaultPosition,
  disableInteractions = false,
  properties = [],
}) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<Map | null>(null);
  const [overlay, setOverlay] = useState<Overlay | null>(null);

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
          center: fromLonLat([0, 0]),
          zoom: 12,
        }),
        controls: defaultControls({
          attributionOptions: {
            collapsible: true,
          },
        }),
        interactions: disableInteractions ? [] : defaultInteractions(),
      });

      const overlayContainer = document.createElement("div");
      overlayContainer.className = "property-preview"; // Tailwind will style this
      document.body.appendChild(overlayContainer);

      const propertyOverlay = new Overlay({
        element: overlayContainer,
        autoPan: true, // Automatically pans the map to make the overlay visible
      });
      initialMap.addOverlay(propertyOverlay);
      setOverlay(propertyOverlay);

      const addMarkersAndAdjustView = () => {
        const features = properties.map((property) => {
          const lon = Number(property.lon); // Ensure lon is a number
          const lat = Number(property.lat); // Ensure lat is a number
          const coords = fromLonLat([lon, lat]);
          const marker = new Feature({ geometry: new Point(coords) });
          marker.setStyle(
            new Style({
              image: new Icon({
                src: "/marker.png",
                anchor: [0.5, 1], // Ensure the marker's center aligns with the click position
              }),
            })
          );
          marker.set("propertyData", property); // Attach property data to each marker
          return marker;
        });

        const vectorSource = new VectorSource({ features });
        const vectorLayer = new VectorLayer({ source: vectorSource });
        initialMap.addLayer(vectorLayer);

        // Adjust view to fit all markers
        if (properties.length > 0) {
          const extent: Extent = boundingExtent(
            properties.map((p) => {
              const lon = Number(p.lon); // Ensure lon is a number
              const lat = Number(p.lat); // Ensure lat is a number
              return fromLonLat([lon, lat]);
            })
          );
          initialMap
            .getView()
            .fit(extent, { padding: [50, 50, 50, 50], maxZoom: 10 });
        }

        // Add marker click interaction for previews
        initialMap.on("click", (evt) => {
          const feature = initialMap.forEachFeatureAtPixel(
            evt.pixel,
            (feature) => feature
          );
          if (feature && feature.get("propertyData")) {
            const propertyData = feature.get(
              "propertyData"
            ) as IPropertyLocationResponse;
            overlayContainer.innerHTML = `
            <a href="/home/property/${propertyData.id}">
              <div class="p-4 bg-white rounded-lg shadow-lg w-48">
                <img src="${propertyData.image}" alt="${propertyData.title}" class="w-full h-24 object-cover rounded-md mb-2" />
                <h3 class="font-semibold text-lg text-gray-800 text-ellipsis line-clamp-2">${propertyData.title}</h3>
              </div>
            </a>
                `;

            // Perform the zoom and pan to the clicked marker, but do it before overlay is updated
            initialMap.getView().animate({
              easing: (t) => t, // Add easing function for smooth transition
            });

            // Use setTimeout to delay the overlay position update until after the zoom finishes
            setTimeout(() => {
              propertyOverlay.setPosition(evt.coordinate);
            }, 600); // Delay the overlay update to allow the zoom to complete

            if (onLocationSelect) {
              const [lon, lat] = toLonLat(evt.coordinate);
              onLocationSelect({ lon, lat });
            }
          } else {
            propertyOverlay.setPosition(undefined); // Hide overlay if no marker
          }
        });
      };

      addMarkersAndAdjustView();

      // Add user-click location marker
      if (!disableInteractions) {
        initialMap.on("singleclick", (evt) => {
          const coords = evt.coordinate;
          const lonLat = toLonLat(coords);
          const [lon, lat] = lonLat;

          const userMarker = new Feature({ geometry: new Point(coords) });
          userMarker.setStyle(
            new Style({
              image: new Icon({
                src: "/user-marker.png",
                anchor: [0.5, 1],
              }),
            })
          );

          const vectorSource = new VectorSource({ features: [userMarker] });
          const userLayer = new VectorLayer({ source: vectorSource });

          // Clear layers and re-add property markers with user marker
          initialMap.getLayers().forEach((layer) => {
            if (layer instanceof VectorLayer) initialMap.removeLayer(layer);
          });
          addMarkersAndAdjustView();
          initialMap.addLayer(userLayer);

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

export default MultiMapComponent;
