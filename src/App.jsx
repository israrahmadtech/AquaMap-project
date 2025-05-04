import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import Home from './components/home';
import LiveLocationMap from './components/userLocation';
import ShareWater from './components/ShareWater';
import Dashboard from './components/Dashboard';
import MoreDetails from './components/MoreDetails';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mylocation" element={<LiveLocationMap />} />
        <Route path="/share" element={<ShareWater />} />
        <Route path="/more-details/:id" element={<MoreDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
