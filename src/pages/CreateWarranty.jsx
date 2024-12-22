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
import CloseIcon from '@mui/icons-material/Close';
import InputLabel from "@mui/material/InputLabel";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import LoadingButton from '@mui/lab/LoadingButton';
import CancelCreateWarranty from "../components/dialogs/CancelCreateWarranty";

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
    const [open, setOpen] = useState(false);
    const [savingWarranty, setSavingWarranty] = useState(false);

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

        await createWarranty(formData, setSavingWarranty, successSave)
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
                        <IconButton color="primary" onClick={handleClickOpen} disabled={savingWarranty}>
                            <CancelIcon />
                        </IconButton>
                        <CancelCreateWarranty open={open} handleClose={handleClose}/>
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
                    disabled={savingWarranty}
                    onChange={(event) => {
                        setFormData({ ...formData, productName: event.target.value });
                    }}
                />
                <MuiFileInput
                    value={formData.product}
                    disabled={savingWarranty}
                    onChange={(newValue) => {
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
                    disabled={savingWarranty}
                    onChange={(newValue) => setFormData({ ...formData, purchaseDate: newValue })}
                />
                <MuiFileInput
                    value={formData.receipt}
                    disabled={savingWarranty}
                    onChange={(newValue) => {
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
                    disabled={savingWarranty}
                    onChange={(event) => {
                        setFormData({ ...formData, warrantyDuration: event.target.value });
                    }}
                />
                <InputLabel id="warranty-duration-unit">Warranty Duration Unit</InputLabel>
                <Select
                    labelId="warranty-duration-unit"
                    value={formData.warrantyDurationUnit}
                    label="Unit"
                    disabled={savingWarranty}
                    onChange={(event) => {
                        setFormData({ ...formData, warrantyDurationUnit: event.target.value });
                    }}
                >
                    <MenuItem value={"Month"}>Months</MenuItem>
                    <MenuItem value={"Year"}>Years</MenuItem>
                </Select>
                <MuiFileInput
                    value={formData.warrantyCard}
                    disabled={savingWarranty}
                    onChange={(newValue) => {
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
            {step === 3 && <LoadingButton
                variant="contained"
                onClick={handleSubmit}
                loading={savingWarranty}
                loadingPosition="end"
                style={{ marginTop: "20px", width: "100%" }}
            >Submit
            </LoadingButton>}
            {(step === 1 || step === 2) && <Button
                variant="outlined"
                disabled={savingWarranty}
                style={{ marginTop: "20px", width: "100%" }}
                onClick={goToNext}
            >Next
            </Button>}
        </MainContainer>
    )
}

export default CreateWarranty;