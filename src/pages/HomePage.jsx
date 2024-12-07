import React, { useState, useEffect } from "react";
import { Container, Col, Row, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { backend_uri } from "../constants";
import { useNavigate, useSearchParams } from "react-router-dom";

function HomePage(props) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [token, setToken] = useState(null);

    useEffect( () => {
        if(searchParams.has('token')) {
            setToken(searchParams.get('token'));
            localStorage.setItem('token', searchParams.get('token'));
        } else {
            setToken(localStorage.getItem('token'));
        }
    },[]);

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token,
      }

    const notifyLoading = () => {
        toast.info("Logging Out Successfull..");
    };

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const handleLogout = () => {
        axios
            .get(`${backend_uri}/auth/logout`, {
                withCredentials: true,
                headers: headers
            })
            .then(() => {
                navigate("/");
                setUser(null);
                notifyLoading();
            })
            .catch((error) => {
                console.error("Error logging out:", error);
            });
    };

    const fetchUser = async () => {
        try {
            const response = await axios.get(
                `${backend_uri}/user/profile`,
                {
                    withCredentials: true,
                    headers: headers
                }
            );
            setUser(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching user data:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [token]);

    return (
        <>
            <div className="LoginPage">
                <Container className="HomePageContainer ProfileContainer">
                    {loading ? (
                        <div className="loader">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </div>
                    ) : user ? (
                        <>
                            <Row>
                                <Col md={12}>
                                    <h1>Welcome to Warranti</h1>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <h1>Profile</h1>
                                    <div className="profile-info">
                                        <div className="profile-image">
                                            <img src={user.profilePicture} alt="Profile" />
                                        </div>
                                        <div className="profile-details">
                                            <p>Username: {user.username}</p>
                                            <p>Email: {user.email}</p>
                                        </div>
                                    </div>
                                    <Button onClick={handleLogout}>Logout</Button>
                                </Col>
                            </Row>
                        </>
                    ) : (
                        <Row>
                            <Col md={12}>
                                <h1>Logging out...</h1>
                            </Col>
                        </Row>
                    )}
                </Container>
            </div>
        </>
    );
}

export default HomePage;
