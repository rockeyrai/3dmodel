'use client'
import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const Map = ({ 
  center = { lat: 40.7128, lng: -74.0060 }, // Default to New York City
  zoom = 12 
}) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef();

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: '', // You'll need to add your Google Maps API key here
        version: 'weekly'
      });

      try {
        const google = await loader.load();
        if (mapRef.current && !mapInstanceRef.current) {
          mapInstanceRef.current = new google.maps.Map(mapRef.current, {
            center,
            zoom,
            styles: [
              {
                featureType: "all",
                elementType: "geometry",
                stylers: [{ color: "#242f3e" }]
              },
              // {
              //   featureType: "all",
              //   elementType: "labels.text.stroke",
              //   stylers: [{ color: "#242f3e" }]
              // },
              // {
              //   featureType: "all",
              //   elementType: "labels.text.fill",
              //   stylers: [{ color: "#746855" }]
              // }
            ]
          });
        }
      } catch (error) {
        console.error('Error loading Google Maps:', error);
      }
    };

    initMap();
  }, [center, zoom]);

  return (
    <div ref={mapRef} className="w-full h-full rounded-lg shadow-lg" />
  );
};

export default Map;
