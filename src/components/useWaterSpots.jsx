import { useState, useEffect } from 'react';


export const useWaterSpots = () => {
    const [spots, setSpots] = useState([]);

    useEffect(() => {
        // Get the water spots from localStorage
        const storedSpots = localStorage.getItem('waterSpots');
        if (storedSpots) {
            setSpots(JSON.parse(storedSpots)); // Parse and update spots from localStorage
        } else {
            // Fetch from static file if localStorage is empty
            const fetchWaterSpots = async () => {
                try {
                    const response = await fetch('/fetchWater.json'); // Static file for testing
                    const data = await response.json();
                    setSpots(data);
                    localStorage.setItem('waterSpots', JSON.stringify(data)); // Store the fetched data in localStorage
                } catch (error) {
                    console.error("Error fetching water spots:", error);
                }
            };
            fetchWaterSpots();
        }
    }, []);

    return { spots };
};
