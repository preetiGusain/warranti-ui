import React, { useState } from 'react';
import { signup } from '../api';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [form, setForm] = useState({ email: '', password: '', firstName: '', lastName: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await signup(form);
            setMessage(response.data.message || 'Signup successful');
            // Redirect after successful signup
            navigate('/dashboard');
        } catch (err) {
            setMessage(err.response?.data?.error?.message || 'Error occurred');
        }
    };

    const googleAuth = () => {
        window.open('https://warranti-backend.onrender.com/oauth/google', '_self');
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f5f5f5',
            }}
        >
            <div
                style={{
                    width: '400px',
                    padding: '20px',
                    backgroundColor: '#fff',
                    borderRadius: '10px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
            >
                <h2 style={{ textAlign: 'center' }}>Create Your Account</h2>
                <form
                    onSubmit={handleSubmit}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '15px',
                    }}
                >
                    <label style={{ fontWeight: 'bold', fontSize: '14px' }}>Email Address</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        style={{
                            padding: '10px',
                            fontSize: '16px',
                            border: '1px solid #ddd',
                            borderRadius: '5px',
                        }}
                    />
                    <label style={{ fontWeight: 'bold', fontSize: '14px' }}>First Name</label>
                    <input
                        type="text"
                        placeholder="Enter your first name"
                        value={form.firstName}
                        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                        style={{
                            padding: '10px',
                            fontSize: '16px',
                            border: '1px solid #ddd',
                            borderRadius: '5px',
                        }}
                    />
                    <label style={{ fontWeight: 'bold', fontSize: '14px' }}>Last Name</label>
                    <input
                        type="text"
                        placeholder="Enter your last name"
                        value={form.lastName}
                        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                        style={{
                            padding: '10px',
                            fontSize: '16px',
                            border: '1px solid #ddd',
                            borderRadius: '5px',
                        }}
                    />
                    <label style={{ fontWeight: 'bold', fontSize: '14px' }}>Password</label>
                    <input
                        type="password"
                        placeholder="Create a password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        style={{
                            padding: '10px',
                            fontSize: '16px',
                            border: '1px solid #ddd',
                            borderRadius: '5px',
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            padding: '10px',
                            backgroundColor: '#e60023',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            fontSize: '16px',
                            cursor: 'pointer',
                        }}
                    >
                        Sign Up
                    </button>
                </form>
                <p style={{ textAlign: 'center', margin: '15px 0' }}>OR</p>
                <button
                    onClick={googleAuth}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '10px',
                        backgroundColor: '#4285F4',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        width: '100%',
                    }}
                >
                    Continue with Google
                </button>
                {message && (
                    <p
                        style={{
                            color: 'red',
                            textAlign: 'center',
                            marginTop: '15px',
                        }}
                    >
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Signup;
