import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    Box,
    Button,
    Typography,
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
import MainContainer from "../components/MainContainer";
import NavigationBar from "../components/NavigationBar";
import { deleteWarranty, getWarranty } from "../utils/warrantyService";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';


function WarrantyPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [warranty, setWarranty] = useState(null);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        getWarranty(id, setWarranty);
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
            <NavigationBar title={warranty?.productName}
                rightElem={<Stack direction="row" spacing={1}>
                    <IconButton
                        color="secondary"
                        onClick={() => navigate(`/edit/${id}`)}
                    >
                        <EditIcon />
                    </IconButton>
                    <Button variant="outlined" onClick={handleClickOpen}>
                        <IconButton color="primary">
                            <DeleteIcon />
                        </IconButton>
                    </Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Delete"}
                        </DialogTitle>
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            sx={(theme) => ({
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color: theme.palette.grey[500],
                            })}
                        >
                            <CloseIcon />
                        </IconButton>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Are you sure you want to delete this item?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={() => deleteWarranty(id, deletedSuccessfully)} autoFocus>
                                Delete
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Stack>} />

            {warranty ? (
                <CardContent>
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