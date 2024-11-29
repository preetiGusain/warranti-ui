import React, {createContext, useContext, useState, useEffect} from "react";
import { checkLogin, logout } from '../api';
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await checkLogin();
                setUser(response.data.user);
            } catch (err) {
                console.error('User not authenticated', err);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const handleLogout = async () => {
        await logout();
        setUser(null);
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ user, loading, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);