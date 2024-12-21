import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MuiFileInput } from 'mui-file-input';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import MainContainer from "../components/MainContainer";
import NavigationBar from "../components/NavigationBar";
import CancelIcon from '@mui/icons-material/Cancel';
import { IconButton, TextField } from "@mui/material";
import { createWarranty } from "../utils/warrantyService";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import InputLabel from "@mui/material/InputLabel";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function CreateWarranty() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        productName: "",
        warrantyDuration: "",
        warrantyDurationUnit: "Month",
        purchaseDate: null,
        warrantyCard: null,
        receipt: null,
        product: null
    });
    const [step, setStep] = useState(1);
    const [open, setOpen] = React.useState(false);

    function successSave(response) {
        setFormData({
            productName: "",
            warrantyDuration: "",
            warrantyDurationUnit: "",
            purchaseDate: "",
            warrantyCard: null,
            receipt: null,
            product: null
        });
        navigate("/home");
    }

    async function handleSubmit(event) {
        event.preventDefault();

        console.log("Form Data: ", formData);

        const warranty = new FormData();
        warranty.append("productName", formData.productName);
        warranty.append("warrantyDuration", formData.warrantyDuration);
        warranty.append("warrantyDurationUnit", formData.warrantyDurationUnit);
        warranty.append("purchaseDate", formData.purchaseDate);

        //adding images
        if (formData.warrantyCard) warranty.append("warrantyCard", formData.warrantyCard);
        if (formData.receipt) warranty.append("receipt", formData.receipt);
        if (formData.product) warranty.append("product", formData.warranty);

        await createWarranty(formData, successSave)
    }

    function goToNext() {
        setStep(step + 1);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <MainContainer>
            <NavigationBar title={"Create"}
                rightElem={
                    <>
                        <Button onClick={handleClickOpen}>
                            <IconButton color="primary">
                                <CancelIcon />
                            </IconButton>
                        </Button>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                {"Discard new Warranty?"}
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
                                    You will loose all the information entered for this Warranty
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Keep Editing</Button>
                                <Button
                                    onClick={() => {
                                        handleClose();
                                        navigate("/home");
                                    }}
                                    autoFocus
                                >
                                    Discard warranty
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </>
                }
            />
            <LinearProgress variant="determinate" value={(step * 100) / 3} />
            {step === 1 && <>
                <TextField
                    required
                    id="product"
                    label="Product Name"
                    value={formData.productName}
                    onChange={(event) => {
                        setFormData({ ...formData, productName: event.target.value });
                    }}
                />
                <MuiFileInput
                    value={formData.product} onChange={(newValue) => {
                        setFormData({ ...formData, product: newValue });
                    }}
                    placeholder="Insert product photo"
                    clearIconButtonProps={{
                        children: <CloseIcon fontSize="small" />
                    }}
                    InputProps={{
                        startAdornment: <AttachFileIcon />
                    }}
                />
            </>
            }

            {step === 2 && <>
                <DatePicker
                    label="Purchase Date"
                    value={formData.purchaseDate}
                    onChange={(newValue) => setFormData({ ...formData, purchaseDate: newValue})}
                />
                <MuiFileInput
                    value={formData.receipt} onChange={(newValue) => {
                        setFormData({ ...formData, receipt: newValue });
                    }}
                    placeholder="Insert receipt photo"
                    clearIconButtonProps={{
                        children: <CloseIcon fontSize="small" />
                    }}
                    InputProps={{
                        startAdornment: <AttachFileIcon />
                    }}
                />
            </>}


            {step === 3 && <>
                <TextField
                    required
                    id="warranty-duration"
                    label="Warranty Duration"
                    type="Number"
                    value={formData.warrantyDuration}
                    onChange={(event) => {
                        setFormData({ ...formData, warrantyDuration: event.target.value });
                    }}
                />
                <InputLabel id="warranty-duration-unit">Warranty Duration Unit</InputLabel>
                <Select
                    labelId="warranty-duration-unit"
                    value={formData.warrantyDurationUnit}
                    label="Unit"
                    onChange={(event) => {
                        setFormData({ ...formData, warrantyDurationUnit: event.target.value });
                    }}
                >
                    <MenuItem value={"Month"}>Months</MenuItem>
                    <MenuItem value={"Year"}>Years</MenuItem>
                </Select>
                <MuiFileInput
                    value={formData.warrantyCard} onChange={(newValue) => {
                        setFormData({ ...formData, warrantyCard: newValue });
                    }}
                    placeholder="Insert Warranty Card"
                    clearIconButtonProps={{
                        children: <CloseIcon fontSize="small" />
                    }}
                    InputProps={{
                        startAdornment: <AttachFileIcon />
                    }}
                />
            </>}
            {step === 3 && <Button
                variant="contained"
                onClick={handleSubmit}
                style={{ marginTop: "20px", width: "100%" }}
            >Submit
            </Button>}
            {(step === 1 || step === 2) && <Button
                variant="outlined"
                style={{ marginTop: "20px", width: "100%" }}
                onClick={goToNext}
            >Next
            </Button>}
        </MainContainer>
    )
}

export default CreateWarranty;