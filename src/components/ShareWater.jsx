import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ShareWater() {
  const [form, setForm] = useState({
    name: '',
    address: '',
    image: null
  });

  const navigate = useNavigate();

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.address) {
      alert("Please fill out all required fields.");
      return;
    }

    let imageBase64 = "";
    if (form.image) {
      try {
        imageBase64 = await getBase64(form.image);
      } catch (error) {
        console.error("Error converting image to base64:", error);
      }
    }

    const newSpot = {
      id: Date.now(),
      name: form.name,
      address: form.address,
      image: imageBase64,
      review: "Not reviewed yet",
      verified: false,
      updatedAt: "Just now",
      distance: "Not calculated"
    };

    const existing = JSON.parse(localStorage.getItem("waterSpots")) || [];
    const updated = [newSpot, ...existing];
    localStorage.setItem("waterSpots", JSON.stringify(updated));

    alert("Water spot submitted!");
    setForm({ name: "", address: "", image: null });

    navigate("/home");
  };

  useEffect(() => {
    const getAddressFromCoords = async (lat, lon) => {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
      );
      const data = await res.json();
      return data.display_name;
    };

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const address = await getAddressFromCoords(latitude, longitude);
        setForm((prev) => ({ ...prev, address }));
      },
      (err) => {
        console.log("Location error:", err);
      }
    );
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-4">Share a Water Source</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Spot Name</label>
          <input
            type="text"
            className="form-control"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Address / Location Info</label>
          <input
            type="text"
            className="form-control"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            placeholder="Auto-filled from your location"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Upload Screenshot</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit Spot</button>
      </form>
    </div>
  );
}

export default ShareWater;
