import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Card, Badge } from 'react-bootstrap';
import '../css/waterSpotedCard.css';

function MoreDetails() {
    const { id } = useParams();
    const location = useLocation();
    const spot = location.state?.spot;

    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState("");

    if (!spot) {
        return <div className="text-center mt-5">❌ Spot data not found!</div>;
    }

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        const newReview = {
            id: Date.now(),
            name: "You",
            time: "Just now",
            rating,
            text: message
        };

        setReviews([newReview, ...reviews]);
        setMessage("");
        setRating(0);
    };

    return (
        <section id='more-details-page' className='py-5'>
            <div className="container">
                <Card className="water-spot-card shadow-lg border-0 rounded-4 overflow-hidden mb-4">
                    <div className="row">
                        <div className="col-md-4">
                            <img
                                src={spot.image?.trim() !== "" ? spot.image : "./images/aqua_logo2.png"}
                                className="h-100 object-fit-cover"
                                alt={spot.name}
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <div className="col-md-8">
                            <Card.Body className="h-100 d-flex flex-column justify-content-between">
                                <Card.Title className="d-flex justify-content-between align-items-center">
                                    <span className="fw-bold fs-4">{spot.name}</span>
                                    <Badge bg={spot.verified ? 'success' : 'secondary'}>
                                        {spot.verified ? 'Verified' : 'Unverified'}
                                    </Badge>
                                </Card.Title>
                                <Card.Text className="text-muted mb-2">
                                    📍 {spot.address}
                                </Card.Text>
                                <Card.Text className="mb-2">
                                    🗺️ <strong>{spot.distance}</strong> away
                                </Card.Text>
                                <Card.Text className="fst-italic text-secondary mb-2">
                                    "{spot.review}"
                                </Card.Text>
                                <Card.Text className="text-end text-muted small">
                                    Last updated: {spot.updatedAt}
                                </Card.Text>
                            </Card.Body>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Feedback Form */}
            <div className="container d-flex">
                <div className="review-card card text-white bg-dark p-2 shadow rounded">
                    <form onSubmit={handleReviewSubmit} className="card-body text-center">
                        <h2 className="card-title h4">Your opinion matters!</h2>
                        <p className="my-3">How was your experience?</p>

                        <div className="d-flex justify-content-center gap-2 mb-4">
                            {[...Array(5)].map((_, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    className="btn btn-link p-0"
                                    title={`Rate ${i + 1} stars`}
                                    onClick={() => setRating(i + 1)}
                                >
                                    <i className={`bi bi-star${i < rating ? '-fill' : ''} ${i < rating ? 'text-warning' : 'text-secondary'} fs-2`}></i>
                                </button>
                            ))}
                        </div>

                        <div className="mb-3">
                            <textarea
                                className="form-control bg-dark text-white"
                                rows="5"
                                placeholder="Message..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            ></textarea>
                        </div>

                        <button type="submit" className="btn btn-warning text-dark fw-semibold w-100 mb-3">
                            Leave feedback
                        </button>

                        <a href="#" className="text-white small d-block">Maybe later</a>
                    </form>
                </div>

                {/* Reviews */}
                <div className="w-50 mx-4 mb-3">
                    {reviews.map((review) => (
                        <div key={review.id} className="card bg-dark text-white border-0 rounded shadow mb-3">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-start mb-3">
                                    <div className="d-flex align-items-center">
                                        <img
                                            src="https://source.unsplash.com/100x100/?portrait"
                                            alt="Profile"
                                            className="rounded-circle me-3"
                                            style={{ width: "48px", height: "48px", objectFit: "cover", backgroundColor: "#6c757d" }}
                                        />
                                        <div>
                                            <h5 className="mb-0 fw-bold">{review.name}</h5>
                                            <small className="text-muted">{review.time}</small>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center text-warning">
                                        {[...Array(5)].map((_, i) => (
                                            <i
                                                key={i}
                                                className={`bi bi-star${i < review.rating ? '-fill' : ''} me-1`}
                                                style={{ fontSize: "1rem" }}
                                            ></i>
                                        ))}
                                    </div>
                                </div>
                                <div className="text-light small">
                                    <p>{review.text}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default MoreDetails;
