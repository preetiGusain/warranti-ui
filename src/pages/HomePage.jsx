import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
    Typography,
    Card,
    CardMedia,
    CardContent,
    CircularProgress
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import MainContainer from "../components/MainContainer";
import { getWarranties } from "../utils/warrantyService";
import ProfileImage from "../components/ProfileImage";

function HomePage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [token, setToken] = useState(null);
    const [warranties, setWarranties] = useState([]);
    const [loadingWarranties, setLoadingWarranties] = useState(true);

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
            getWarranties(setLoadingWarranties, setWarranties);
        }
    }, [token]);

    return (
        <MainContainer>
            <Grid container direction={"column"} justify="space-between">
                <Grid item container columns={12}>
                    <Grid size={10}>
                        <Typography variant="h4" fontWeight="bold">
                            Warranti
                        </Typography>
                    </Grid>
                    <Grid size={2}>
                        {/* Profile Icon */}
                        <ProfileImage />
                    </Grid>
                </Grid>
                {/* Warranty Items */}
                <Grid item container spacing={2}
                    sx={{
                        marginTop: 2,
                        maxHeight: "75vh",
                        overflowY: "auto"
                    }}
                    direction="column">
                    {warranties.length > 0 && (
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
                                        }
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
                                            Warranty Duration:{" "}
                                            {warranty.warrantyDuration}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontSize: "0.75rem",
                                                color: warranty.status === "Active" ? "green" : "red",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Status: {warranty.status}
                                        </Typography>

                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    )}
                    {loadingWarranties && (<CircularProgress color="secondary" />)}
                    {!loadingWarranties && warranties.length === 0 && (
                        <Typography variant="body1">No warranties found.</Typography>
                    )}
                </Grid>

                {/* Footer Buttons */}
                <Grid item
                    sx={{
                        zIndex: 1000,
                        bottom: 16,
                        right: 16,
                        position: "relative",
                    }}
                >
                    <Fab color="default" aria-label="add" onClick={() => navigate("/create")}>
                        <AddIcon />
                    </Fab>
                </Grid>
            </Grid>
        </MainContainer>
    );
}

export default HomePage;
