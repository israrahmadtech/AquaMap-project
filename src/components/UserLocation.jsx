import React, { useEffect, useState } from 'react';
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

function LiveLocationMap() {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch the live location using Geolocation API
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          const address = await getAddressFromCoords(latitude, longitude);
          setForm((prev) => ({ ...prev, address }));
        }, (err) => {
          console.log("Location error:", err);
        });
      }, []);
      

    return (
        <div className="p-3">
            <h4>User Live Location on Map</h4>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-danger">{error}</p>
            ) : (
                <MapContainer
                    center={[location.lat, location.lng]}
                    zoom={13}
                    style={{ height: '400px', width: '100%' }}
                >
                    <TileLayer
                        attribution='&copy; OpenStreetMap contributors'
                        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    />
                    <Marker position={[location.lat, location.lng]}>
                        <Popup>Your current location</Popup>
                    </Marker>
                </MapContainer>
            )}
        </div>
    );
}

export default LiveLocationMap;
