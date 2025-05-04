import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../css/home.css'; // optional custom styles
import MapComponent from './Map';
import WaterSpotCard from './waterSpotCard';
import { useWaterSpots } from './useWaterSpots';

function Home() {

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

            <section id="map" className="container py-5">
                <MapComponent center={mapCenter} />
            </section>



            <section>
                <div id="water-spots" className="container">
                    {spots.length === 0 ? (
                        <p>No water spots shared yet.</p>
                    ) : (
                        <div className="row">
                            {spots.map((spot) => (
                                <WaterSpotCard key={spot.id} spot={spot} />
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
