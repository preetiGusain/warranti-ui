import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/Login";
import HomePage from "./pages/HomePage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import CreateWarranty from "./pages/CreateWarranty";
import WarrantyPage from "./pages/WarrantyPage";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import LandingPage from "./pages/Landing/Landing";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ContactPage from "./pages/Contact";

function App() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            {/* Toast notifications globally available */}
            <ToastContainer />
            <Routes>
                <Route path="/" element={<LandingPage/>} />
                <Route path="/login" element={<AuthPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/create" element={<CreateWarranty />} />
                <Route path="/:id" element={<WarrantyPage />} />
                <Route path="/privacypolicy" element={<PrivacyPolicy />} />
                <Route path="/contact" element={<ContactPage />} />
            </Routes>
        </LocalizationProvider>
    );
}

export default App;