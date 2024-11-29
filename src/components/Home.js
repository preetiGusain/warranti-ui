import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';

const googleAuth = () => {
    window.open('https://warranti-backend.onrender.com/oauth/google', '_self');
};

const Home = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(form);
            setMessage(response.data.message || 'Logged in successfully');
            // Redirect to Dashboard after login
            navigate('/dashboard');
        } catch (err) {
            setMessage(err.response?.data?.error?.message || 'Error occurred');
        }
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
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
                    Welcome to Warranti
                </h2>
                <form
                    onSubmit={handleSubmit}
                    style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
                >
                    <input
                        type="email"
                        placeholder="Email address"
                        value={form.email}
                        onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                        }
                        style={{
                            padding: '10px',
                            fontSize: '16px',
                            border: '1px solid #ddd',
                            borderRadius: '5px',
                        }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={(e) =>
                            setForm({ ...form, password: e.target.value })
                        }
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
                        Login
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
                <p
                    style={{
                        marginTop: '20px',
                        textAlign: 'center',
                        fontSize: '14px',
                        color: '#666',
                    }}
                >
                    Not on Warranti yet?{' '}
                    <span
                        style={{
                            color: '#e60023',
                            cursor: 'pointer',
                            textDecoration: 'underline',
                        }}
                        onClick={() => navigate('/signup')}
                    >
                        Sign up
                    </span>
                </p>
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

export default Home;
