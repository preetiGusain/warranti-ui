import React from "react";
import Box from '@mui/material/Box';
import { Grid2, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

function NavigationBar({ title, rightElem }) {
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                width: "100%"
            }}
        >
            <Grid2 container direction="row" spacing={2}>
                <Grid2 size={2}>
                    <IconButton
                        color="secondary"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                </Grid2>

                <Grid2>
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        gutterBottom
                        textAlign="space-between"
                    >
                        {title}
                    </Typography>
                </Grid2>

                {rightElem &&
                    <Grid2 size={4}>
                        {rightElem}
                    </Grid2>}
            </Grid2>
        </Box>
    )
}

export default NavigationBar;