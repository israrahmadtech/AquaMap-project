import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import '../css/waterSpotedCard.css'
import { Link } from 'react-router-dom';

function WaterSpotCard({ spot }) {
    return (
        <Card className="water-spot-card shadow-lg border-0 rounded-4 overflow-hidden mb-4">
            <div className="row">
                <div className="col-md-4">
                    <img
                        src={spot.image && spot.image.trim() !== "" ? spot.image : "./images/aqua_logo2.png"}
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
                        <Link  to={`/more-details/${spot.id}`} state={{ spot }}>
                            <Button variant="outline-secondary" size="sm" className="fst-italic mb-2">
                                More details
                            </Button>
                        </Link>
                    </Card.Body>
                </div>
            </div>
        </Card>
    );
}

export default WaterSpotCard;
