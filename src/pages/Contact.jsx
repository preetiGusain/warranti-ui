import React from 'react';
import { useNavigate } from "react-router-dom";

const ContactPage = () => {
    const navigate = useNavigate();

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4', textAlign: 'center', padding: '50px' }}>
            <div style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '10px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
                <h2 style={{ color: '#333333' }}>Need Assistance?</h2>
                <p style={{ color: '#555555', fontSize: '18px' }}>For any issues or inquiries, feel free to contact us:</p>
                <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#007bff' }}>
                    <a href="mailto:preetigusain9173@gmail.com" style={{ textDecoration: 'none', color: '#007bff' }}>
                        preetigusain9173@gmail.com
                    </a>
                </p>
            </div>
            <button
                onClick={() => navigate(-1)}
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    left: '50%',
                    zIndex: '1000',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    padding: '10px 20px'
                }}
            >
                Go Back
            </button>
        </div>
    );
};

export default ContactPage;
