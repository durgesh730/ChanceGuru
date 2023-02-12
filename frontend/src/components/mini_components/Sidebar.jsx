import React from "react";
import { useState , useEffect } from "react";

import ProfileDetailsForm from "../forms/profile_details/ProfileDetailsFrom";
import TalentDetailsForm from "../forms/profile_details/TalentDetailsForm";
import BioExpForm from "../forms/profile_details/BioExpForm";
import PhotoVideoForm from "../forms/profile_details/PhotoVideoForm";
import EduSkillForm from "../forms/profile_details/EduSkillForm";
import RolePref from "../forms/profile_details/RolePrefFrom";
import axios from "axios";

const Sidebar = () => {
    const [profile, setProfile] = useState(true);
    const [talent, setTalent] = useState(false);
    const [bio, setBio] = useState(false);
    const [photo, setPhoto] = useState(false);
    const [skill, setSkill] = useState(false);
    const [role, setRole] = useState(false);

    const [profileData, setprofileData] = useState({});
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

    const handleShow = async () => {
        axios
            .get(`http://localhost:5000/profile/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                if (response.data !== null) {
                    setprofileData(response.data);
                    setbool(true);
                }
            })
            .catch((err) => {
                console.log(err.response);
            });
    }

    useEffect(() => {
      handleShow();
    }, [])
    
    return (
        <>
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

            <ProfileDetailsForm display={profile} toggle={toggleForm} profileData={profileData} bool={bool}  setbool={setbool} />
            <TalentDetailsForm display={talent} toggle={toggleForm} profileData={profileData} />
            <BioExpForm display={bio} toggleForm={toggleForm} profileData={profileData} />
            <PhotoVideoForm display={photo} toggleForm={toggleForm} profileData={profileData} />
            <EduSkillForm display={skill} toggleForm={toggleForm} profileData={profileData} />
            <RolePref display={role} toggleForm={toggleForm} profileData={profileData} />
        </>
    );
};

export default Sidebar;
