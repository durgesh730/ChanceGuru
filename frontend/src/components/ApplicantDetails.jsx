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

    const [shortListCount, setShortListCount] = useState(0)
    const [waitingCount, setWaitingCount] = useState(0)
    const [rejectedCount, setRejectedCount] = useState(0)

    var applied = leadRoles.map((Data) => { return Data._id });
    var check = applied[0]


    var modal = document.getElementById("myModal");
    var btn = document.getElementById("myBtn");
    var span = document.getElementsByClassName("close")[0];

    function handlemodal() {
        modal.style.display = "block";
    }
    function handlemod() {
        modal.style.display = "none";
    }

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
    }

    useEffect(() => {
        setShortListCount(0)
        setWaitingCount(0)
        setRejectedCount(0)
        Data?.map((item) => {
            if (item.status === "shortlist" || item.status === "selected") {
                setShortListCount(prevCount => prevCount += 1)

            }
            else if (item.status === "scheduled" || item.status === "applied") {
                setWaitingCount(prevCount => prevCount += 1)
            }
            else if (item.status === "rejected") {
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

    const [inputList, setinputList] = useState([{ date: '', location: '' }]);
    // console.log(inputList)

    const handleinputchange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setinputList(list);
    }

    const handleremove = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setinputList(list);
    }

    const handleaddclick = () => {
        setinputList([...inputList, { date: '', location: '' }]);
    }
    
    var id = 0;
    projectDetails?.map((item, i)=>{
        id = item._id
    })

    const Schedule = async () => {
        const data = await fetch(`http://localhost:5000/project/Datetime/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(inputList)
        })
        const json = await data.json();
        console.log(json)
    }

    useEffect(() => {
        fetchData();
        ProjectData()
    }, [setData])

    return (
        <>
            <Topbar />


            <div className="content-container">
                <div>
                    <div className="projCont">
                        <img src={promotion} className="promotion" alt="" />
                        {
                            projectDetails?.map((items, i) => {
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

                    <div className="card my-4">
                        <div className="card-body">
                            <button onClick={handlemodal} className="btn btn-primary ">Schedule Audition </button>
                        </div>
                    </div>
                </div>

                {/*============= modal ======================== */}


                <div id="myModal" className="modal my-4 ">
                    <div className="modal-content">

                        <div className="row">
                            <div className="col-sm-12">
                                <h5 className="mt-3 mb-4 fw-bold">Add date and time</h5>
                                {
                                    inputList.map((x, i) => {
                                        return (
                                            <div className="row mb-3">
                                                <div class="form-group col-md-3">
                                                    <label >Date</label>
                                                    <input type="date" name="date" class="form-control" placeholder="Date" onChange={e => handleinputchange(e, i)} />
                                                </div>
                                                <div class="form-group col-md-3 mx-4 ">
                                                    <label >Location</label>
                                                    <input type="location" name="location" class="form-control" placeholder="Location" onChange={e => handleinputchange(e, i)} />
                                                </div>
                                                <div class="form-group col-md-2 mt-4">
                                                    {
                                                        inputList.length !== 1 &&
                                                        <button className="btn btn-danger mx-1 " onClick={() => handleremove(i)}>Remove</button>
                                                    }
                                                    {inputList.length - 1 === i &&
                                                        <button className="btn btn-success my-2 " onClick={handleaddclick}>Add More</button>
                                                    }
                                                </div>
                                            </div>
                                        );
                                    })}


                            </div>
                        </div>

                        <div className="text-center" >
                            <button className='btn btn-primary ' onClick={handlemod} > close </button>
                            <button className='btn btn-primary mx-4 ' onClick={Schedule} > Schedule </button>
                        </div>
                    </div>
                </div>





                <div className="applicantDetails">
                    <div className="topNavbar">
                        {

                            projectDetails?.map((items, ind) => items.roles.map((i, index) => {
                                return (
                                    <span highlighted={active === index ? "true" : "false"} onClick={() => { setActive(index); setLeadRoles(i.characters); setActiveChar(i.characters[0]) }} >{i.role + ` (${i.characters.length})`}</span>
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
                            // console.log(shortListCount,waitingCount,rejectedCount)
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