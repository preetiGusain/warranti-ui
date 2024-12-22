import React, { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import { deleteWarranty } from "../../utils/warrantyService";
import {
    Button,
    IconButton,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

function DeleteWarranty({ open, id, handleClose, deletedSuccessfully }) {
    const [deletingWarranty, setDeletingWarranty] = useState(false);

    return (
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
                disabled={deletingWarranty}
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
                <Button onClick={handleClose}
                    disabled={deletingWarranty}
                >Cancel</Button>
                <LoadingButton
                    onClick={() => deleteWarranty(id, setDeletingWarranty, deletedSuccessfully)} autoFocus
                    variant="contained"
                    loading={deletingWarranty}
                    loadingPosition="end"
                >
                    Delete
                </LoadingButton>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteWarranty;