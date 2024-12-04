import React from "react";
import { Route, Routes } from "react-router-dom";
import './App.css';
import AuthPage from "./pages/Login";
import HomePage from "./pages/HomePage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
    return (
        <>
            <ToastContainer />
            <Routes>
                <Route path="/" element={<AuthPage />} />
                <Route path="/home" element={<HomePage />} />
            </Routes>
        </>
    );
}

export default App;