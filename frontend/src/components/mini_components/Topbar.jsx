import React  from "react";
import { Link } from "react-router-dom";

import "./minicomp.css";
import home from "../../assets/icons/144-home copy.svg";
import directorchair from "../../assets/icons/director-chair.svg"
import clapperboard from "../../assets/icons/clapperboard.svg";
import thumbsup from "../../assets/icons/Group 156.svg"
import notification from "../../assets/icons/211-notification.svg";
import chat from "../../assets/icons/045-chat-1.svg";
import profile from "../../assets/icons/profile1.svg";
import mask from "../../assets/icons/Group 110.svg"

const Topbar = (props) => {
    const user = JSON.parse(localStorage.getItem("login"));
    return (
        <div className="topbar">
            <div className="topbar-name">
                Chance <br /> Guru
            </div>
            <div className="topbar-nav">
                <Link to="/talentdashboard">
                    <span className="topbar-icons-container">
                        <img className="topbar-icons" src={home} alt="" />
                    </span>
                </Link>
                <span className="topbar-icons-container">
                    <img className="topbar-icons" src={directorchair} alt="" />
                </span>
                <Link to="/roles">
                    <span className="topbar-icons-container">
                        <img className="topbar-icons" src={mask} alt="" />
                    </span>
                </Link>

                <span className="topbar-icons-container">
                    <img className="topbar-icons" src={thumbsup} alt="" />
                </span>
                <span className="topbar-icons-container">
                    <img className="topbar-icons" src={chat} alt="" />
                </span>
                <Link to="/projectcreation">
                    <span className="topbar-icons-container">
                        <img className="topbar-icons" src={notification} alt="" />
                    </span>
                </Link>
                <Link to="/profiledetails">
                    <span className="d-flex align-items-center cursor-pointer">
                        <span className="topbar-icons-container">
                            <img className="topbar-icons topbar-profile" src={profile} alt="" />
                        </span>
                        <span className="top-profile-name">{user.name}</span>
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default Topbar;
