import React, { useEffect, useState } from 'react'
import Topbar from './mini_components/Topbar'
import promotion from "../assets/icons/promotion.svg";
import list from "../assets/icons/list-button.svg";
import time from "../assets/icons/time-left.svg";
import reject from "../assets/icons/round-delete-button.svg";
import ApplicantRowCard from './mini_components/ApplicantRowCard';
import { useLocation } from 'react-router-dom';

const ApplicantDetails = () => {
    const location = useLocation();

    const [projectDetails, setProjectDetails] = useState();
    const [active, setActive] = useState(0);
    const [leadRoles, setLeadRoles] = useState([])


    const ProjectData = async () => {
        const data = await fetch(`http://localhost:5000/project/projectDetails/${location.state}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const res = await data.json();
        setProjectDetails(res)
        
    }

    useEffect(()=>{
        console.log(projectDetails)
        if(projectDetails){

            setLeadRoles(projectDetails[0].roles[0].characters)
        }
    },[projectDetails])

    // for finding total characters in Project by using map

    var char = 0;
    var all = new Array();
    var a = 0;

    {
        projectDetails?.map((items, i) => items.roles.map((i) => {
            char = char + i.characters.length;
            var length = i.characters.length;
            for (i = 0; i < length; i++) {
                all[i] = char
            }

            for (i = 0; i < all.length; i++) {
                if (all[i] > a)
                    a = all[i]
            }
        })
        )
    }


    const [Data, setData] = useState();
    const fetchData = async () => {
        const data = await fetch(`http://localhost:5000/project/Seekers/${location.state}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const json = await data.json();
        setData(json)
    }

    // for count applied by

    var len = 0;
    var c = 0;
    {
        Data?.map((Data, i) => {
            len = Data.userId.length;
            if (len) {
                c++;
            }
        })
    }

    useEffect(() => {
        fetchData();
        ProjectData()
    }, [setData])

    return (
        <>
            <Topbar />

            <div className="content-container">
                <div className="projCont">
                    <img src={promotion} className="promotion" alt="" />
                    {
                        projectDetails?.map((items, i) => {
                            // console.log(items.basicInfo.name)
                            return (
                                <>
                                    <span key={i} className="projectTitle">
                                        {items.basicInfo.name}
                                    </span>
                                    <span className="projectInfo">
                                        {items.basicInfo.desc}
                                    </span>
                                </>
                            )
                        })
                    }

                    <div className="Path-26"></div>
                    <span className='postedOn'>Posted On</span>
                    <span className="date">{"02/04/2001"}</span>
                    <span className="location">Location</span>

                    {
                        projectDetails?.map((items, i) => {
                            return (
                                <>
                                    <span className="locationName">{items.basicInfo.address}</span>
                                </>
                            )
                        })
                    }

                    <div className="lastRow">
                        <span number={c} className='appliedBy'>Applied By</span>

                        {
                            projectDetails?.map((items, i) => {
                                return (
                                    <>
                                        <span key={i} number={items.roles.length} className='roles'>Roles</span>
                                    </>
                                )
                            })
                        }
                        <span number={a} className='characters'>Characters</span>
                    </div>
                </div>


                <div className="applicantDetails">
                    <div className="topNavbar">

                        {
                            
                            projectDetails?.map((items, ind) => items.roles.map((i,index) => {
                                return (
                                    <span highlighted={active === index?"true":"false"} className='lead' onClick={()=>{setActive(index); setLeadRoles(i.characters)}} >{i.role}</span>
                                )
                            })
                            )
                        }
                    </div>
                    <hr />



                    <div className="leadRoles" style={{ dispay: "flex", flexDirection: "row", justifyContent: "space-between" }} >
                        {
                            leadRoles.map((p) => {
                                // console.log(p.name)
                                return (
                                    <>
                                        <span className='malcom'>{p.name}</span>
                                    </>
                                )
                            }
                            )
                        }

                    </div>

                    <div className="statusContainer">
                        <div highlighted="true" className='shortlisted'>
                            <img src={list} alt="" />
                            <span number="10" >Short-listed</span>

                        </div>
                        <div className='rejected'>
                            <img src={time} alt="" />
                            <span number="01" >Waiting List</span>

                        </div>
                        <div className='waiting'>
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
                            {Data?.map((Data, i) =>
                            (
                                <ApplicantRowCard key={i} Data={Data} />
                            )
                            )}{" "}
                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}

export default ApplicantDetails