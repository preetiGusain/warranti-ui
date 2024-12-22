import { Avatar, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetchUser } from "../utils/warrantyService";

function ProfileImage() {
    const [user, setUser] = useState(null);
    const [profileLoading, setProfileLoading] = useState(true);

    useEffect(() => {
        fetchUser(setProfileLoading, setUser);
    }, [])

    return (
        <>
            {user && <Avatar
                alt={user.name}
                src={user.profilePicture}
                sx={{ cursor: "pointer" }}
                onClick={() => console.log("Profile clicked")}
            />}
            {profileLoading && (<CircularProgress color="secondary" />)}
        </>
    )
};

export default ProfileImage;