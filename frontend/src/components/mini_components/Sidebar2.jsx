import React from "react";

import ProjectSummaryForm from "../forms/project_creation/ProjectSummaryForm";
import ProjectDetailsForm from "../forms/project_creation/ProjectDetailsForm";
import RoleDescForm from "../forms/project_creation/RoleDescForm";
import RoleLabelForm from "../forms/project_creation/RoleLabelForm";
import { useState } from "react";

const Sidebar2 = () => {
    const [details, setDetails] = useState(true);
    const [labels, setLabels] = useState(false);
    const [description, setBio] = useState(false);
    const [summary, setSummary] = useState(false);

    const [projectDetails, setProjectDetails] = useState({
        name: "",
        description: "",
        company_name: "",
        company_address: "",
        city: "",
        state: "",
        country: "",
        email: "",
        number: "",
        facebook: "",
        instagram: "",
    });

    const [formFields, setformFields] = useState([{ role: "", characters: [] }]);
    const setFalse = () => {
        setDetails(false);
        setLabels(false);
        setBio(false);
        setSummary(false);
    };

    const [active, setactive] = useState({ 1: true, 2: false, 3: false, 4: false })
    const toggleForm = (form_name) => {
        setFalse();
        switch (form_name) {
            case "details":
                setDetails(true);
                setactive({ 1: true, 2: false, 3: false, 4: false });
                break;
            case "labels":
                setLabels(true);
                setactive({ 1: false, 2: true, 3: false, 4: false });
                break;
            case "description":
                setBio(true);
                setactive({ 1: false, 2: false, 3: true, 4: false });
                break;
            case "summary":
                setSummary(true);
                setactive({ 1: false, 2: false, 3: false, 4: true });
                break;
        }
    };


    //for publishing project 

    const basicInfo = {
        name: projectDetails.name,
        desc: projectDetails.description,
        company: projectDetails.company_name,
        address: projectDetails.company_address,
        city: projectDetails.city,
        state: projectDetails.state,
        country: projectDetails.country,
        email: projectDetails.email,
        phone: projectDetails.number,
        facebook: projectDetails.facebook,
        instagram: projectDetails.instagram,
    }


    return (
        <>
            <div className="sidebar">
                <div className="sidebar-components">
                    <h3>Design a Project</h3>
                    <p className={`sidebar-items ${active[1] ? "active" : ""}`} onClick={() => {setDetails(true); setactive({ 1: true, 2: false, 3: false, 4: false }); }} >
                        Project Details <span></span>
                    </p>
                    <p className={`sidebar-items ${active[2] ? "active" : ""}`} onClick={() => alert("Save project details you will be directed to Role Labels")}>
                        Role Labels <span></span>
                    </p>
                    <p className={`sidebar-items ${active[3] ? "active" : ""}`} onClick={() => alert("Save Role Labels you will be directed to Role Description")}>
                        Role Description <span></span>
                    </p>
                    <p className={`sidebar-items ${active[4] ? "active" : ""}`} onClick={() => alert("Save Role Description you will be directed to Summary")}>
                        Project Summary <span></span>
                    </p>
                </div>
            </div>
            <ProjectDetailsForm display={details} functions={{ projectDetails, setProjectDetails, toggleForm }} />
            <RoleLabelForm display={labels} functions={{ formFields, setformFields, toggleForm }} />
            <RoleDescForm display={description} functions={{ formFields, setformFields, toggleForm }} />
            <ProjectSummaryForm display={summary} values={{ basicInfo, formFields }} />
        </>
    );
};

export default Sidebar2;
