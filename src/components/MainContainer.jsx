import React from "react";
import {
    Box,
} from "@mui/material";

function MainContainer({ children }) {

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                background: "linear-gradient(to right, #dab8fc, #afc2ff)",
                padding: "20px",
            }}
        >
            {/* White Box Container */}
            <Box
                sx={{
                    backgroundColor: "white",
                    borderRadius: "16px",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                    padding: "32px",
                    width: "100%",
                    maxWidth: "450px",
                    minHeight: "80vh",
                    maxHeight: "80vh",
                    textAlign: "center",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                }}
            >
                {children}
            </Box>
        </Box>
    );
}

export default MainContainer;