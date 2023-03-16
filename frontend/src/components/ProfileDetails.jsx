import React, { useState } from "react";
import Topbar from "./mini_components/Topbar";
import Sidebar from "./mini_components/Sidebar";
import { useLocation } from "react-router-dom";

const ProfileDetails = () => {
    const location = useLocation()
    return (
        <div>
            <Topbar />
            <Sidebar userData={location.state?.user} />
        </div>
    );
};

export default ProfileDetails;
