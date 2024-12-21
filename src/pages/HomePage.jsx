import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
    Grid,
    Typography,
    Avatar,
    Box,
    Card,
    CardMedia,
    CardContent
} from "@mui/material";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import MainContainer from "../components/MainContainer";
import { fetchUser, getWarranties, logoutUser } from "../utils/warrantyService";

function HomePage(props) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [token, setToken] = useState(null);
    const [warranties, setWarranties] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (token === null) {
            if (searchParams.has('token')) {
                setToken(searchParams.get('token'));
                localStorage.setItem('token', searchParams.get('token'));
            } else {
                setToken(localStorage.getItem('token'));
            }
        }
    }, []);

    useEffect(() => {
        if (token) {
            fetchUser(setUser);
            getWarranties(setWarranties);
        }
    }, [token]);

    

    const notifyLoading = () => {
        toast.info("Logging Out Successfull..");
    };

    const handleLogout = () => {
        logoutUser
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
        <MainContainer>
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
                    justifyContent: "end",
                    marginTop: "auto",
                    paddingTop: "100px",
                }}
            >
                <Fab color="default" aria-label="add" onClick={() => navigate("/create")}>
                    <AddIcon />
                </Fab>
            </Box>
        </MainContainer>
    );
}

export default HomePage;
