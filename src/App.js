import React from "react";
import { Route, Routes } from "react-router-dom";
import './App.css';
import AuthPage from "./pages/Login";
import HomePage from "./pages/HomePage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import CreateWarranty from "./pages/CreateWarranty";
import WarrantyPage from "./pages/WarrantyPage";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function App() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ToastContainer />
            <Routes>
                <Route path="/" element={<AuthPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/create" element={<CreateWarranty />} />
                <Route path="/:id" element={<WarrantyPage />} />
            </Routes>
        </LocalizationProvider>
    );
}

export default App;