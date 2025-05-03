import React from 'react';
import { Link } from 'react-router-dom';
import '../css/home.css'; // optional custom styles

function Home() {
    return (
        <>
            <header className="bg-primary text-white py-5 text-center">
                <div className="container">
                    <h1 className="display-4 fw-bold">Find Free Water Near You</h1>
                    <p className="lead">Helping communities locate free water sources within a 2KM radius.</p>
                    <div className="d-flex justify-content-center mt-4">
                        <Link to="/map" className="btn btn-light btn-lg me-3">Find Water</Link>
                        <Link to="/share" className="btn btn-outline-light btn-lg">Share a Spot</Link>
                    </div>
                </div>
            </header>

            <section className="container py-5">
                <h2 className="text-center mb-4">How It Works</h2>
                <div className="row text-center">
                    <div className="col-md-4">
                        <h5>🔍 Search</h5>
                        <p>Use your location or search by place to find nearby water sources.</p>
                    </div>
                    <div className="col-md-4">
                        <h5>📸 Share</h5>
                        <p>Found a water spot? Upload a screenshot and mark the location.</p>
                    </div>
                    <div className="col-md-4">
                        <h5>✅ Verify</h5>
                        <p>Read reviews from others to check if a water source is still valid.</p>
                    </div>
                </div>
            </section>

            <footer className="bg-light py-4 text-center">
                <p className="mb-0">© 2025 WaterFinder | Built for Fluxxion Hackathon</p>
            </footer>
        </>
    );
}

export default Home;
