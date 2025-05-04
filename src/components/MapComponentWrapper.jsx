import React, { useEffect, useState } from 'react';
import MapComponent from './Map';

function MapComponentWrapper({ center, onMasjidData }) {
  const [masjidLocations, setMasjidLocations] = useState([]);
  const [waterLocations, setWaterLocations] = useState([]);

  useEffect(() => {
    const fetchMasjidsFromOverpass = async () => {
      const [lat, lng] = center;
      const radius = 5; // in KM
      const delta = radius / 111; // approx for 1km

      const south = lat - delta;
      const west = lng - delta;
      const north = lat + delta;
      const east = lng + delta;

      const overpassQuery = `
        [out:json];
        node["amenity"="place_of_worship"]["religion"="muslim"](${south},${west},${north},${east});
        out;
      `;

      try {
        const response = await fetch("https://overpass-api.de/api/interpreter", {
          method: "POST",
          body: overpassQuery
        });

        const data = await response.json();

        const formattedMasjids = data.elements.map((node) => ({
          id: node.id,
          lat: node.lat,
          lng: node.lon,
          name: node.tags?.name || "Unknown Masjid",
          address: node.tags?.name || "Nearby Masjid",
        }));

        setMasjidLocations(formattedMasjids);
        onMasjidData(formattedMasjids); // 👈 send data to Home
      } catch (error) {
        console.error("Error fetching masjids:", error);
      }
    };

    fetchMasjidsFromOverpass();
  }, [center, onMasjidData]);

  useEffect(() => {
    const savedWaterLocations = JSON.parse(localStorage.getItem('waterSources')) || [];
    setWaterLocations(savedWaterLocations);
  }, []);

  return (
    <MapComponent
      center={center}
      masjidLocations={masjidLocations}
      waterLocations={waterLocations}
    />
  );
}


export default MapComponentWrapper;
