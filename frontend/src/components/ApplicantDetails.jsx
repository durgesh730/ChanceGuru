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
    const [activeChar, setActiveChar] = useState({})
    const [activeStatus, setActiveStatus] = useState("shortlist")

    const [shortListCount,setShortListCount] = useState(0)
    const [waitingCount,setWaitingCount] = useState(0)
    const [rejectedCount,setRejectedCount] = useState(0)

    var applied = leadRoles.map((Data) => { return Data._id });
    var check = applied[0]


    const ProjectData = async () => {
        const data = await fetch(`http://localhost:5000/project/projectDetails/${location.state}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const res = await data.json();
        // console.log(res)
        setProjectDetails(res)

    }

    useEffect(() => {
        if (projectDetails) {
            setLeadRoles(projectDetails[0].roles[0].characters)
            setActiveChar(projectDetails[0].roles[0].characters[0])

        }
    }, [projectDetails])

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
        // console.log(json);
    }

    useEffect(() => {
        setShortListCount(0)
        setWaitingCount(0)
        setRejectedCount(0)
        Data?.map((item) => {
            if(item.status === "shortlist" || item.status === "selected"){
                setShortListCount(prevCount => prevCount += 1)
                
            }
            else if(item.status === "scheduled" || item.status === "applied"){
                setWaitingCount(prevCount => prevCount += 1)
            }
            else if(item.status === "rejected"){
                setRejectedCount(prevCount => prevCount += 1)
            }

        })
    }, [Data])

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
                        <span number={`${c}`} className='appliedBy'>Applied By</span>

                        {
                            projectDetails?.map((items, i) => {
                                return (
                                    <>
                                        <span key={i} number={items.roles.length} className='roles'>Roles</span>
                                    </>
                                )
                            })
                        }
                        <span number={`${a}`} className='characters'>Characters</span>
                    </div>
                </div>


                <div className="applicantDetails">
                    <div className="topNavbar">

                        {

                            projectDetails?.map((items, ind) => items.roles.map((i, index) => {
                                return (
                                    <span highlighted={active === index ? "true" : "false"} className='lead' onClick={() => { setActive(index); setLeadRoles(i.characters); setActiveChar(i.characters[0]) }} >{i.role}</span>
                                )
                            })
                            )
                        }
                    </div>
                    <hr />



                    <div className="leadRoles" style={{ dispay: "flex", flexDirection: "row", justifyContent: "space-between" }} >
                        {
                            leadRoles.map((p, index) => {

                                return (
                                    <>
                                        <span highlighted={activeChar === p ? "true" : "false"} onClick={() => setActiveChar(p)} >{p.name}</span>
                                    </>
                                )
                            }
                            )
                        }

                    </div>

                    <div className="statusContainer">
                        {
                            console.log(shortListCount,waitingCount,rejectedCount)
                        }
                        <div highlighted={activeStatus === "shortlist" ? "true" : "false"} className='shortlisted' onClick={() => setActiveStatus("shortlist")} >
                            <img src={list} alt="" />
                            <span number={`${shortListCount}`}   >Short-listed</span>

                        </div>
                        <div highlighted={activeStatus === "scheduled" ? "true" : "false"} className='rejected' onClick={() => setActiveStatus("scheduled")} >
                            <img src={time} alt="" />
                            <span number={`${waitingCount}`}  >Waiting List</span>

                        </div>
                        <div highlighted={activeStatus === "rejected" ? "true" : "false"} className='waiting' onClick={() => setActiveStatus("rejected")} >
                            <img src={reject} alt="" />
                            <span number={`${rejectedCount}`}  >Rejected</span>

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

                            {

                                Data?.map((Data, i) => {
                                    console.log(Data)
                                    if (activeChar._id == Data.charId) {
                                        if (activeStatus === "shortlist") {
                                            if (Data.status === activeStatus || Data.status === "selected") {

                                                return (
                                                    <ApplicantRowCard key={i} Data={Data} applied={check} />
                                                )
                                            }
                                        }
                                        if (activeStatus === "scheduled") {
                                            if (Data.status === activeStatus || Data.status === "applied") {

                                                return (
                                                    <ApplicantRowCard key={i} Data={Data} applied={check} />
                                                )
                                            }
                                        }

                                        if (activeStatus === "rejected") {
                                            if (Data.status === activeStatus) {

                                                return (
                                                    <ApplicantRowCard key={i} Data={Data} applied={check} />
                                                )
                                            }
                                        }


                                    }

                                }
                                )}{""}

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ApplicantDetails