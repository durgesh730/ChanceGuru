import React from "react";

import ProjectSummaryForm from "../forms/project_creation/ProjectSummaryForm";
import ProjectDetailsForm from "../forms/project_creation/ProjectDetailsForm";
import RoleDescForm from "../forms/project_creation/RoleDescForm";
import RoleLabelForm from "../forms/project_creation/RoleLabelForm";
import { useState } from "react";

const Sidebar2 = () => {
    const items = document.querySelectorAll(".sidebar-items");

    items.forEach((item) => {
        item.addEventListener("click", (event) => {
            items.forEach((item) => {
                item.classList.remove("active");
            });
            item.classList.add("active");
        });
    });

    const [details, setDetails] = useState(true);
    const [labels, setLabels] = useState(false);
    const [description, setBio] = useState(false);
    const [summary, setSummary] = useState(false);

    const setFalse = () => {
        setDetails(false);
        setLabels(false);
        setBio(false);
        setSummary(false);
    };

    const toggleForm = (form_name) => {
        setFalse();
        switch (form_name) {
            case "details":
                setDetails(true);
                break;
            case "labels":
                setLabels(true);
                break;
            case "description":
                setBio(true);
                break;
            case "summary":
                setSummary(true);
                break;
        }
    };

    return (
        <>
            <div className="sidebar">
                <div className="sidebar-components">
                    <h3>Design a Project</h3>
                    <p className="sidebar-items active" onClick={() => toggleForm("details")}>
                        Project Details <span></span>
                    </p>
                    <p className="sidebar-items" onClick={() => toggleForm("labels")}>
                        Role Labels <span></span>
                    </p>
                    <p className="sidebar-items" onClick={() => toggleForm("description")}>
                        Role Description <span></span>
                    </p>
                    <p className="sidebar-items" onClick={() => toggleForm("summary")}>
                        Project Summary <span></span>
                    </p>
                </div>
            </div>
            <ProjectDetailsForm display={details} />
            <RoleLabelForm display={labels} />
            <RoleDescForm display={description} />
            <ProjectSummaryForm display={summary} />
        </>
    );
};

export default Sidebar2;
