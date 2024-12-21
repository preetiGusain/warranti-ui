import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { backend_uri } from "../constants";
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardMedia,
    Grid,
    useTheme,
    useMediaQuery,
    IconButton,
    Stack
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MainContainer from "../components/MainContainer";


function WarrantyPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [warranty, setWarranty] = useState(null);
    const [token, setToken] = useState(null);
    const [searchParams] = useSearchParams();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
            getWarranty();
        }
    }, [token]);

    const getWarranty = async () => {
        try {
            const response = await axios.get(
                `${backend_uri}/warranty/${id}`,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                }
            );
            setWarranty(response.data.warranty);
        } catch (error) {
            console.error("Error fetching warranty:", error);
        }
    }

    const deleteWarranty = async () => {
        try {
            const response = await axios.delete(
                `${backend_uri}/warranty/${id}`,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                }
            );
            if (response.status == 200) {
                console.log("Warranty deleted successfully:", response.data);
                navigate("/home");
            }
        } catch (error) {
            console.error("Error deleting warranty:", error);
        }
    }

    return (
        <MainContainer>
            <Stack sx={{ position: 'absolute', top: 16, right: 16 }} direction="row" spacing={1}>
                <IconButton
                    color="secondary"
                    onClick={() => navigate(`/edit/${id}`)}
                >
                    <EditIcon />
                </IconButton>
                <IconButton
                    color="primary"
                    onClick={deleteWarranty}
                >
                    <DeleteIcon />
                </IconButton>
            </Stack>
            <Stack sx={{ position: 'absolute', top: 16, left: 16 }} direction="row" spacing={1}>
                <IconButton
                    color="secondary"
                    onClick={() => navigate(-1)}
                >
                    <ArrowBackIcon />
                </IconButton>
            </Stack>

            {warranty ? (
                <CardContent>
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        gutterBottom
                        textAlign="space-between"
                    >
                        {warranty.productName}
                    </Typography>
                    <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1" fontWeight="bold">
                                Purchase Date:
                            </Typography>
                            <Typography variant="body2">
                                {new Date(warranty.purchaseDate).toLocaleDateString()}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1" fontWeight="bold">
                                Warranty Duration:
                            </Typography>
                            <Typography variant="body2">
                                {warranty.warrantyDuration} {warranty.warrantyDurationUnit}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1" fontWeight="bold">
                                Status:
                            </Typography>
                            <Typography variant="body2">{warranty.status}</Typography>
                        </Grid>
                    </Grid>
                    <Typography variant="body1" fontWeight="bold">
                        Product:
                    </Typography>
                    <CardMedia
                        component="img"
                        image={warranty.productPhoto || "No image"}
                        sx={{
                            marginBottom: 2,
                            borderRadius: 2,
                            maxWidth: isSmallScreen ? "75" : "100px",
                            maxHeight: "100px",
                            objectFit: "cover"
                        }}
                    />
                    <Typography variant="body1" fontWeight="bold">
                        Receipt:
                    </Typography>
                    <CardMedia
                        component="img"
                        image={warranty.receiptPhoto || "No image"}
                        sx={{
                            marginBottom: 2,
                            borderRadius: 2,
                            maxWidth: isSmallScreen ? "75px" : "100px",
                            maxHeight: "100px",
                            objectFit: "cover"
                        }}
                    />
                    <Typography variant="body1" fontWeight="bold">
                        Warranty Card:
                    </Typography>
                    <CardMedia
                        component="img"
                        image={warranty.warrantyCardPhoto || "No image"}
                        sx={{
                            marginBottom: 2,
                            borderRadius: 2,
                            maxWidth: isSmallScreen ? "75px" : "100px",
                            maxHeight: "100px",
                            objectFit: "cover"
                        }}
                    />
                </CardContent>
            ) : (
                <Typography variant="h5" color="text.secondary">
                    Loading warranty details...
                </Typography>
            )}

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: 2,
                }}
            >
            </Box>
        </MainContainer>
    )
};

export default WarrantyPage;