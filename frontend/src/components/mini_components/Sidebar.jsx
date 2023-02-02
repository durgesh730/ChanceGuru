import React from "react";
import { useState } from "react";

import ProfileDetailsForm from "../forms/profile_details/ProfileDetailsFrom";
import TalentDetailsForm from "../forms/profile_details/TalentDetailsForm";
import BioExpForm from "../forms/profile_details/BioExpForm";
import PhotoVideoForm from "../forms/profile_details/PhotoVideoForm";
import EduSkillForm from "../forms/profile_details/EduSkillForm";
import RolePref from "../forms/profile_details/RolePrefFrom";

const Sidebar = () => {
    const items = document.querySelectorAll(".sidebar-items");

    items.forEach((item) => {
        item.addEventListener("click", (event) => {
            items.forEach((item) => {
                item.classList.remove("active");
            });
            item.classList.add("active");
        });
    });

    const [profile, setProfile] = useState(true);
    const [talent, setTalent] = useState(false);
    const [bio, setBio] = useState(false);
    const [photo, setPhoto] = useState(false);
    const [skill, setSkill] = useState(false);
    const [role, setRole] = useState(false);

    const setFalse = () => {
        setProfile(false);
        setTalent(false);
        setBio(false);
        setPhoto(false);
        setSkill(false);
        setRole(false);
    };

    const toggleForm = (form_name) => {
        setFalse();
        switch (form_name) {
            case "profile":
                setProfile(true);
                break;
            case "talent":
                setTalent(true);
                break;
            case "bio":
                setBio(true);
                break;
            case "photo":
                setPhoto(true);
                break;
            case "skill":
                setSkill(true);
                break;
            case "role":
                setRole(true);
                break;
        }
    };

    return (
        <>
            <div className="sidebar">
                <div className="sidebar-components">
                    <h3>Build your profile</h3>
                    <p className="sidebar-items active" onClick={() => toggleForm("profile")}>
                        Profile Details <span></span>
                    </p>
                    <p className="sidebar-items" onClick={() => toggleForm("talent")}>
                        Talent Details <span></span>
                    </p>
                    <p className="sidebar-items" onClick={() => toggleForm("bio")}>
                        Bio & Experience <span></span>
                    </p>
                    <p className="sidebar-items" onClick={() => toggleForm("photo")}>
                        Photos & Videos <span></span>
                    </p>
                    <p className="sidebar-items" onClick={() => toggleForm("skill")}>
                        Education & Skills <span></span>
                    </p>
                    <p className="sidebar-items" onClick={() => toggleForm("role")}>
                        Role Prefrences <span></span>
                    </p>
                </div>
            </div>

            <ProfileDetailsForm display={profile} />
            <TalentDetailsForm display={talent} />
            <BioExpForm display={bio} />
            <PhotoVideoForm display={photo} />
            <EduSkillForm display={skill} />
            <RolePref display={role} />
        </>
    );
};

export default Sidebar;
