import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Signup from './components/Signup';

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Redirect "/" to "/home" */}
                <Route path="/" element={<Navigate to="/home" replace />} />

                {/* Public Home Route */}
                <Route path="/home" element={<Home />} />

                <Route path="/signup" element={<Signup />} />

                {/* Protected Dashboard Route */}
                <Route path="/dashboard" element={<Dashboard />} />

            </Routes>
        </Router>

    );
};

export default App;
