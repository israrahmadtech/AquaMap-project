import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../css/home.css'; // optional custom styles
import MapComponent from './Map';
import WaterSpotCard from './waterSpotCard';
import { useWaterSpots } from './useWaterSpots';
import MapComponentWrapper from './MapComponentWrapper';

function Home() {

    const [masjids, setMasjids] = useState([]);

    const spot = {
        name: "Masjid Water Tap",
        image: "./images/waterSpot1.jpg",
        address: "Near ABC Chowk, Bara Bazar",
        distance: "300m",
        review: "Clean water, used daily",
        verified: true,
        updatedAt: "2 days ago"
    };

    const [searchText, setSearchText] = useState("");
    const [mapCenter, setMapCenter] = useState([34.0151, 71.5249]); // Default center

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchText) return;

        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${searchText}`
            );
            const data = await response.json();

            if (data.length > 0) {
                const { lat, lon } = data[0];
                setMapCenter([parseFloat(lat), parseFloat(lon)]);
            } else {
                alert("Location not found!");
            }
        } catch (error) {
            alert("Error fetching location.");
        }
    };

    const inputRef = useRef();

    const { spots } = useWaterSpots();

    function getDistanceKm(lat1, lon1, lat2, lon2) {
        const R = 6371; // Earth radius in KM
        const dLat = ((lat2 - lat1) * Math.PI) / 180;
        const dLon = ((lon2 - lon1) * Math.PI) / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    return (
        <>
            <header id="header" className='bg-body-tertiary'>
                <div className="container">
                    <nav className="navbar">
                        <div className="container-fluid">
                            <a className="navbar-brand">
                                <div className="logo d-flex align-items-center gap-2">
                                    <img src="./images/aqua_logo2.png" alt="" />
                                    <h1 className='fs-2 fw-bold'>AquaMap</h1>
                                </div>
                            </a>
                            {/* <form className="d-flex" onSubmit={handleSearch}>
                                <input
                                    ref={inputRef}
                                    className="form-control me-2"
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                />

                                <button className="btn btn-outline-success" type="submit">Search</button>
                            </form> */}

                        </div>
                    </nav>
                </div>
            </header>
            <section id='banner' className="bg-primary text-white py-5 text-center">
                <div className="container">
                    <h1 className="display-4 fw-bold">Find Free Water Near You</h1>
                    <p className="lead">Helping communities locate free water sources</p>
                    <div className="d-flex justify-content-center mt-4">
                        <Link
                            to="#"
                            className="btn btn-light btn-lg me-3"
                            onClick={() => inputRef.current?.focus()}
                        >
                            Find Water
                        </Link>

                        <Link to="/share" className="btn btn-outline-light btn-lg">Share Water</Link>
                    </div>
                </div>
            </section>

            <div className="container pt-4">
                <form className="d-flex" onSubmit={handleSearch}>
                    <input
                        ref={inputRef}
                        className="form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />

                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>

            <section id="map" className="container py-5 pt-3">
                <MapComponentWrapper center={mapCenter} onMasjidData={setMasjids} />
            </section>



            <section>
                <div id="water-spots" className="container">
                    <h3 className="mb-3">Nearby Water (within 5KM)</h3>
                    {masjids.length === 0 ? (
                        <p>No masjids found nearby.</p>
                    ) : (
                        <div className="row">
                            {masjids
                                .map((masjid) => {
                                    const distance = getDistanceKm(mapCenter[0], mapCenter[1], masjid.lat, masjid.lng);
                                    return {
                                        id: masjid.id,
                                        name: masjid.name,
                                        address: masjid.address,
                                        image: '/images/aqua_logo2.png',
                                        distance: `${distance.toFixed(2)} km`,
                                        review: "Community prayer area",
                                        verified: true,
                                        updatedAt: "Today"
                                    };
                                })
                                .filter((m) => parseFloat(m.distance) <= 1)
                                .map((masjid) => (
                                    <WaterSpotCard key={masjid.id} spot={masjid} />
                                ))}
                        </div>
                    )}
                </div>
            </section>



            <footer className="bg-light py-4 text-center">
                <p className="mb-0">© 2025 WaterFinder | Built for Fluxxion Hackathon</p>
            </footer>
        </>
    );
}

export default Home;
