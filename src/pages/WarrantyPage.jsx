import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    Typography,
    CardContent,
    CardMedia,
    useTheme,
    useMediaQuery,
    IconButton,
    Stack,
    Grid2 as Grid,
    CircularProgress
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MainContainer from "../components/MainContainer";
import NavigationBar from "../components/NavigationBar";
import { getWarranty } from "../utils/warrantyService";
import DeleteWarranty from "../components/dialogs/DeleteWarranty";


function WarrantyPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [warranty, setWarranty] = useState(null);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const [open, setOpen] = useState(false);
    const [loadingWarranty, setLoadingWarranty] = useState(true);

    useEffect(() => {
        getWarranty(id, setLoadingWarranty, setWarranty);
    }, []);

    const deletedSuccessfully = (response) => {
        navigate("/home");
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <MainContainer>
            <NavigationBar
                title={warranty?.productName || "Loading..."}
                rightElem={
                    <Stack direction="row" spacing={1}>
                        <IconButton
                            color="secondary"
                            onClick={() => navigate(`/edit/${id}`)}
                            disabled={loadingWarranty}
                        >
                            <EditIcon />
                        </IconButton>
                        <IconButton
                            color="primary"
                            onClick={handleClickOpen}
                            disabled={loadingWarranty}
                        >
                            <DeleteIcon />
                        </IconButton>
                        <DeleteWarranty
                            open={open}
                            handleClose={handleClose}
                            id={id}
                            deletedSuccessfully={deletedSuccessfully}
                        />
                    </Stack>
                }
            />

            {warranty ? (
                <CardContent
                    sx={{
                        overflowY: "auto",
                        maxHeight: "calc(80vh - 100px)",
                    }}
                >
                    <Grid container spacing={2} wrap="wrap" sx={{ marginBottom: 2 }}>
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
                                Warranty Expiry:
                            </Typography>
                            <Typography variant="body2">
                                {new Date(warranty.warrantyEndDate).toLocaleDateString()}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1" fontWeight="bold">
                                Status:
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: warranty.status === "Active" ? "green" : "red",
                                    fontWeight: "bold",
                                }}
                            >
                                {warranty.status}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Typography variant="body1" fontWeight="bold">
                        Product:
                    </Typography>
                    <CardMedia
                        component="img"
                        image={warranty.productPhoto || "/default-product.png"}
                        sx={{
                            marginBottom: 2,
                            borderRadius: 2,
                            maxWidth: "100%",
                            maxHeight: "150px",
                            objectFit: "contain",
                        }}
                    />
                    <Typography variant="body1" fontWeight="bold">
                        Receipt:
                    </Typography>
                    <CardMedia
                        component="img"
                        image={warranty.receiptPhoto || "/default-receipt.png"}
                        sx={{
                            marginBottom: 2,
                            borderRadius: 2,
                            maxWidth: "100%",
                            maxHeight: "150px",
                            objectFit: "contain",
                        }}
                    />
                    <Typography variant="body1" fontWeight="bold">
                        Warranty Card:
                    </Typography>
                    <CardMedia
                        component="img"
                        image={warranty.warrantyCardPhoto || "/default-warranty-card.png"}
                        sx={{
                            marginBottom: 2,
                            borderRadius: 2,
                            maxWidth: "100%",
                            maxHeight: "150px",
                            objectFit: "contain",
                        }}
                    />
                </CardContent>
            ) : loadingWarranty ? (
                <CircularProgress color="secondary" />
            ) : (
                <Typography variant="body1">Warranty not found.</Typography>
            )}
        </MainContainer>
    )
};

export default WarrantyPage;