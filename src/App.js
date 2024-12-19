import React from "react";
import { Route, Routes } from "react-router-dom";
import './App.css';
import AuthPage from "./pages/Login";
import HomePage from "./pages/HomePage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import CreateWarranty from "./pages/CreateWarranty";
import WarrantyPage from "./pages/WarrantyPage";

function App() {
    return (
        <>
            <ToastContainer />
            <Routes>
                <Route path="/" element={<AuthPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/create" element={<CreateWarranty/>} />
                <Route path="/:id" element={<WarrantyPage/>} />
            </Routes>
        </>
    );
}

export default App;