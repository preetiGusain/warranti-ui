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
                padding: "8px 16px",
                backgroundColor: "white",
                borderBottom: "1px solid #ddd",
                position: "sticky",
                top: 0,
                zIndex: 10,
            }}
        >
            {/* Back Button */}
            <IconButton
                color="secondary"
                onClick={() => navigate(-1)}
                sx={{ flexShrink: 0 }}
            >
                <ArrowBackIcon />
            </IconButton>

            {/* Title */}
            <Typography
                variant="h6"
                fontWeight="bold"
                noWrap
                sx={{
                    flexGrow: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    textAlign: "center",
                    marginLeft: "16px",
                    marginRight: "16px",
                }}
            >
                {title}
            </Typography>

            {/* Right Elements */}
            {rightElem && (
                <Box sx={{ flexShrink: 0, display: "flex", alignItems: "center" }}>
                    {rightElem}
                </Box>
            )}
        </Box>
    );
}

export default NavigationBar;