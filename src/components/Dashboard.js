import React, { useEffect, useState } from 'react';
import { logout, checkLogin } from '../api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await checkLogin();
                setUser(response.data.user);
            } catch (err) {
                console.error('Error fetching user:', err);
                navigate('/');
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [navigate]);

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            {user ? (
                <>
                    <h1>Welcome to Warranti!, {user.username || 'Google User'}</h1>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <p>No user data available</p>
            )}
        </div>
    );
};

export default Dashboard;
