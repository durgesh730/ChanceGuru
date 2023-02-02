import React, { useState } from 'react'
import Topbar from './mini_components/Topbar'
import promotion from "../assets/icons/promotion.svg";
import list from "../assets/icons/list-button.svg";
import time from "../assets/icons/time-left.svg";
import reject from "../assets/icons/round-delete-button.svg";
import ApplicantRowCard from './mini_components/ApplicantRowCard';



const ApplicantDetails = () => {
    const [projectDetails, setProjectDetails] = useState({
        date: "05/8/2018",
        location: "New Jersey",
        projectName: "Shakespeare's Macbeth",
        applicantCount: "23",
        roleCount: "03",
        charCount: "06",
    });
    return (
        <>
            <Topbar />
            <div className="content-container">

                <div className="projCont">
                    <img src={promotion} className="promotion" alt="" />
                    <span className="projectTitle">
                        {projectDetails.projectName}
                    </span>
                    <span className="projectInfo">
                        Casting "Macbeth" by William Shakespeare.
                        Set in 11th century Scotland.
                    </span>

                    <div className="Path-26"></div>
                    <span className='postedOn'>Posted On</span>
                    <span className="date">{projectDetails.date}</span>
                    <span className="location">Location</span>
                    <span className="locationName">{projectDetails.location}</span>
                    <div className="lastRow">
                        <span number={projectDetails.applicantCount} className='appliedBy'>Applied By</span>
                        <span number={projectDetails.roleCount} className='roles'>Roles</span>
                        <span number={projectDetails.charCount} className='characters'>Characters</span>
                    </div>
                </div>
                <div className="applicantDetails">
                    <div className="topNavbar">
                        <span highlighted="true" className='lead' >Lead(03)</span>
                        <span className='supportingActor' >Supporting Actor(01)</span>
                        <span className='chorus' >Chorus/Ensemble(01)</span>
                    </div>
                    <hr />
                    <div className="leadRoles">
                        <span className='malcom'>Malcom</span>
                        <span highlighted="true" className='macDuff' >MacDuff</span>
                        <span className='ladymacduff'>Lady MacDuff</span>
                    </div>
                    <div className="statusContainer">
                        <div highlighted="true" className='shortlisted'>
                            <img src={list} alt="" />
                            <span number = "10" >Short-listed</span>
                            
                        </div>
                        <div  className='rejected'>
                            <img src={time} alt="" />
                            <span number = "01" >Waiting List</span>
                            
                        </div>
                        <div  className='waiting'>
                            <img src={reject} alt="" />
                            <span number="12" >Rejected</span>
                            
                        </div>
                    </div>
                    <div className="applicantList">
                        <div className="tableHeading">
                            <span className='name'>Applicant Name</span>
                            <span className='last'>Last Update</span>
                            <span className='action'>Actions</span>
                        </div>
                        <hr />
                        <div className="listItems">
                            <ApplicantRowCard/>
                            <ApplicantRowCard/>
                            <ApplicantRowCard/>
                            <ApplicantRowCard/>
                            <ApplicantRowCard/>
                            <ApplicantRowCard/>
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ApplicantDetails