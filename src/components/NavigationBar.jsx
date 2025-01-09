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
                width: "100%",
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 1
            }}
        >
            <Grid2 container direction="row" alignItems="center" spacing={2}>
                <Grid2 item>
                    <IconButton
                        color="secondary"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                </Grid2>

                <Grid2 item xs>
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        noWrap
                        sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            width: '100%',
                            textAlign: 'center',
                        }}
                    >
                        {title}
                    </Typography>
                </Grid2>

                {rightElem &&
                    <Grid2 item>
                        {rightElem}
                    </Grid2>}
            </Grid2>
        </Box>
    );
}

export default NavigationBar;