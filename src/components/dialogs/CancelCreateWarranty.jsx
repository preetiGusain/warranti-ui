import React from "react";
import { useNavigate } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import {
    Button,
    IconButton,
} from "@mui/material";

function CancelCreateWarranty({ open, handleClose }) {
    const navigate = useNavigate();

    return (
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
    )
}

export default CancelCreateWarranty;