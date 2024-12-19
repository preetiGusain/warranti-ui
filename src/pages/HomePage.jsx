import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backend_uri } from "../constants";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
    Grid,
    Typography,
    Avatar,
    Button,
    Box,
    Card,
    CardMedia,
    CardContent
} from "@mui/material";


function HomePage(props) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [token, setToken] = useState(null);
    const [warranties, setWarranties] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (searchParams.has('token')) {
            setToken(searchParams.get('token'));
            localStorage.setItem('token', searchParams.get('token'));
        } else {
            setToken(localStorage.getItem('token'));
        }
        fetchUser();
        getWarranties();
    }, [token]);

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token,
    }

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

    const getWarranties = async () => {
        try {
            const response = await axios.get(
                `${backend_uri}/warranty/warranties`,
                {
                    withCredentials: true,
                    headers: headers
                }
            );
            setWarranties(response.data.warranties);
        } catch (error) {
            console.error("Error fetching warranties:", error);
        }
    }

    const notifyLoading = () => {
        toast.info("Logging Out Successfull..");
    };

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


    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                    background: "linear-gradient(to right, #dab8fc, #afc2ff)",
                    padding: "20px",
                }}
            >
                {/* White Box Container */}
                <Box
                    sx={{
                        backgroundColor: "white",
                        borderRadius: "16px",
                        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                        padding: "32px",
                        width: "100%",
                        maxWidth: "450px",
                        minHeight: "80vh",
                        textAlign: "center",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                    }}
                >

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "16px",
                        }}
                    >
                        {/* Title */}
                        <Typography variant="h4" fontWeight="bold">
                            Warranti
                        </Typography>

                        {/* Profile Icon */}
                        {user && (
                            <Avatar
                                alt={user.name || "Profile"}
                                src={user.profilePicture || "/default-avatar.png"}
                                sx={{ cursor: "pointer" }}
                                onClick={() => console.log("Profile clicked")}
                            />
                        )}
                    </Box>

                    {/* Warranty Items */}
                    <Grid container spacing={2} sx={{ marginTop: 2 }}>
                        {warranties.length > 0 ? (
                            warranties.map((warranty) => (
                                <Grid item xs={12} key={warranty._id}>
                                    <Card
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            boxShadow: 3,
                                            "&:hover": {
                                                transform: "scale(1.05)",
                                                transition: "transform 0.3s ease-in-out",
                                            },
                                        }}
                                        onClick={() => navigate(`/${warranty._id}`)}
                                    >
                                        <CardMedia
                                            component="img"
                                            sx={{ width: 100, height: 100 }}
                                            image={warranty.productPhoto || "/default-product.png"}
                                            alt={warranty.productName}
                                        />
                                        <CardContent>
                                            <Typography variant="h6" fontWeight="bold">
                                                {warranty.productName}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{ fontSize: "0.75rem" }}
                                            >
                                                Purchased on:{" "}
                                                {new Date(warranty.purchaseDate).toLocaleDateString()}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{ fontSize: "0.75rem" }}
                                            >
                                                Warranty valid until:{" "}
                                                {new Date(warranty.purchaseDate).toLocaleDateString()}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))
                        ) : (
                            <Typography variant="body1">No warranties found.</Typography>
                        )}
                    </Grid>

                    {/* Footer Buttons */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: "auto",
                            paddingTop: "100px",
                        }}
                    >
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "rgb(122, 50, 199)",
                                "&:hover": { backgroundColor: "rgba(122, 50, 199, 0.8)" },
                            }}
                            onClick={() => navigate("/create")}
                        >
                            Create
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default HomePage;
