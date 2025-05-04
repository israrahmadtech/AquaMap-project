import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import markerRetina from 'leaflet/dist/images/marker-icon-2x.png';

// Fix default icon for Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerRetina,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Red icon for user location
const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function MapComponent({ center, masjidLocations, waterLocations }) {
  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: '400px', width: '100%' }}
      key={center.toString()}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />

      {/* 🔴 User Location Marker (Red) */}
      <Marker position={center} icon={redIcon}>
        <Popup>You are here</Popup>
      </Marker>

      {/* Masjid Markers */}
      {masjidLocations.map((loc, idx) => (
        <Marker key={`masjid-${idx}`} position={[loc.lat, loc.lng]}>
          <Popup>{loc.name || 'Masjid'}</Popup>
        </Marker>
      ))}

      {/* Water Source Markers */}
      {waterLocations.map((loc, idx) => (
        <Marker key={`water-${idx}`} position={[loc.lat, loc.lng]}>
          <Popup>{loc.name || 'Shared Water Location'}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapComponent;
