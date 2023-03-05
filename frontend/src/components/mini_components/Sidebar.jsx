import React from "react";
import { useState, useEffect } from "react";

import ProfileDetailsForm from "../forms/profile_details/ProfileDetailsFrom";
import TalentDetailsForm from "../forms/profile_details/TalentDetailsForm";
import BioExpForm from "../forms/profile_details/BioExpForm";
import PhotoVideoForm from "../forms/profile_details/PhotoVideoForm";
import EduSkillForm from "../forms/profile_details/EduSkillForm";
import RolePref from "../forms/profile_details/RolePrefFrom";
import axios from "axios";
import { BsThreeDotsVertical } from "react-icons/bs";


const Sidebar = () => {
    const [profile, setProfile] = useState(true);
    const [talent, setTalent] = useState(false);
    const [bio, setBio] = useState(false);
    const [photo, setPhoto] = useState(false);
    const [skill, setSkill] = useState(false);
    const [role, setRole] = useState(false);
    const [bool, setbool] = useState(false);

    const setFalse = () => {
        setProfile(false);
        setTalent(false);
        setBio(false);
        setPhoto(false);
        setSkill(false);
        setRole(false);
    };

    const [active, setactive] = useState({ 1: true, 2: false, 3: false, 4: false, 5: false, 6: false })
    const toggleForm = (form_name) => {
        setFalse();
        switch (form_name) {
            case "profile":
                setProfile(true);
                setactive({ 1: true, 2: false, 3: false, 4: false, 5: false, 6: false });
                break;
            case "talent":
                setTalent(true);
                setactive({ 1: false, 2: true, 3: false, 4: false, 5: false, 6: false });
                break;
            case "bio":
                setBio(true);
                setactive({ 1: false, 2: false, 3: true, 4: false, 5: false, 6: false });
                break;
            case "photo":
                setPhoto(true);
                setactive({ 1: false, 2: false, 3: false, 4: true, 5: false, 6: false });
                break;
            case "skill":
                setSkill(true);
                setactive({ 1: false, 2: false, 3: false, 4: false, 5: true, 6: false });
                break;
            case "role":
                setRole(true);
                setactive({ 1: false, 2: false, 3: false, 4: false, 5: false, 6: true });
                break;
        }
    };

    const [toggleSideNav, settoggleSideNav] = useState(false)

    const handleSideNavbar = () => {
        if (toggleSideNav) {
            settoggleSideNav(false);
            document.querySelector(".side_bar").style.display = "block"
        }
        else {
            settoggleSideNav(true)
            document.querySelector(".side_bar").style.display = "none"
        }
    }

    return (
        <>
            <div>
                <span className="navSideToggle" onClick={handleSideNavbar}><BsThreeDotsVertical />
                </span>
            </div>

            <div className="side_bar">
                <div className="sidebar">
                    <div className="sidebar-components">
                        <h3>Build your profile</h3>
                        <p className={`sidebar-items ${active[1] ? "active" : ""}`} onClick={() => { toggleForm("profile"); setactive({ 1: true, 2: false, 3: false, 4: false, 5: false, 6: false }); }}>
                            Profile Details <span></span>
                        </p>
                        <p className={`sidebar-items ${active[2] ? "active" : ""}`} onClick={() => { toggleForm("talent"); setactive({ 1: false, 2: true, 3: false, 4: false, 5: false, 6: false }); }}>
                            Talent Details <span></span>
                        </p>
                        <p className={`sidebar-items ${active[3] ? "active" : ""}`} onClick={() => { toggleForm("bio"); setactive({ 1: false, 2: false, 3: true, 4: false, 5: false, 6: false }); }}>
                            Bio & Experience <span></span>
                        </p>
                        <p className={`sidebar-items ${active[4] ? "active" : ""}`} onClick={() => { toggleForm("photo"); setactive({ 1: false, 2: false, 3: false, 4: true, 5: false, 6: false }); }}>
                            Photos & Videos <span></span>
                        </p>
                        <p className={`sidebar-items ${active[5] ? "active" : ""}`} onClick={() => { toggleForm("skill"); setactive({ 1: false, 2: false, 3: false, 4: false, 5: true, 6: false }); }}>
                            Education & Skills <span></span>
                        </p>
                        <p className={`sidebar-items ${active[6] ? "active" : ""}`} onClick={() => { toggleForm("role"); setactive({ 1: false, 2: false, 3: false, 4: false, 5: false, 6: true }); }}>
                            Role Prefrences <span></span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="sidebar-toggle">
                <div className="sidebar">
                    <div className="sidebar-components">
                        <h3>Build your profile</h3>
                        <p className={`sidebar-items ${active[1] ? "active" : ""}`} onClick={() => { toggleForm("profile"); setactive({ 1: true, 2: false, 3: false, 4: false, 5: false, 6: false }); }}>
                            Profile Details <span></span>
                        </p>
                        <p className={`sidebar-items ${active[2] ? "active" : ""}`} onClick={() => { toggleForm("talent"); setactive({ 1: false, 2: true, 3: false, 4: false, 5: false, 6: false }); }}>
                            Talent Details <span></span>
                        </p>
                        <p className={`sidebar-items ${active[3] ? "active" : ""}`} onClick={() => { toggleForm("bio"); setactive({ 1: false, 2: false, 3: true, 4: false, 5: false, 6: false }); }}>
                            Bio & Experience <span></span>
                        </p>
                        <p className={`sidebar-items ${active[4] ? "active" : ""}`} onClick={() => { toggleForm("photo"); setactive({ 1: false, 2: false, 3: false, 4: true, 5: false, 6: false }); }}>
                            Photos & Videos <span></span>
                        </p>
                        <p className={`sidebar-items ${active[5] ? "active" : ""}`} onClick={() => { toggleForm("skill"); setactive({ 1: false, 2: false, 3: false, 4: false, 5: true, 6: false }); }}>
                            Education & Skills <span></span>
                        </p>
                        <p className={`sidebar-items ${active[6] ? "active" : ""}`} onClick={() => { toggleForm("role"); setactive({ 1: false, 2: false, 3: false, 4: false, 5: false, 6: true }); }}>
                            Role Prefrences <span></span>
                        </p>
                    </div>
                </div>
            </div>


            <ProfileDetailsForm display={profile} toggle={toggleForm} bool={bool} setbool={setbool} />
            <TalentDetailsForm display={talent} toggle={toggleForm} />
            <BioExpForm display={bio} toggleForm={toggleForm} />
            <PhotoVideoForm display={photo} toggleForm={toggleForm} />
            <EduSkillForm display={skill} toggleForm={toggleForm} />
            <RolePref display={role} toggleForm={toggleForm} />
        </>
    );
};

export default Sidebar;
