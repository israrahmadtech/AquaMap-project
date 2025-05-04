import React, { createContext, useState, useContext } from 'react';

const WaterSpotContext = createContext();

export const WaterSpotProvider = ({ children }) => {
  const [spots, setSpots] = useState([]);

  const addSpot = (newSpot) => {
    setSpots((prev) => [newSpot, ...prev]);
  };

  return (
    <WaterSpotContext.Provider value={{ spots, addSpot }}>
      {children}
    </WaterSpotContext.Provider>
  );
};

export const useWaterSpots = () => useContext(WaterSpotContext);
