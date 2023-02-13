import React, { useState } from "react";
import Topbar from "./mini_components/Topbar";
import pfp from "../assets/images/Mask Group 29.png";
import { NavLink, useLocation } from "react-router-dom";
import Details from "./mini_components/userProfile/Details";
import Talents from "./mini_components/userProfile/Talents";
import BioExperience from "./mini_components/userProfile/BioExperience";
import Education from "./mini_components/userProfile/Education";
import UserRole from "./mini_components/userProfile/UserRole";
import Thumb from "../assets/images/Group 36.png";
import axios from "axios";
import { BsArrowRight } from "react-icons/bs";

const UserProfile = (props) => {

  const [active, setActive] = useState("details");
  const [modal, setModal] = useState(false);
  const [select, setSelect] = useState('selected')
  const [rejected, setRejected] = useState('rejected')
  const [shortlist, setshortlist] = useState('shortlist')
  const [schedule, setSchedule] = useState('scheduled')



  const handleApplyReq = () => {

    axios.post('http://localhost:5000/profile/ReqToApp',{talentId: location.state.userId},{
      
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
      
    })
    .then(res => {
      console.log(res.data);
     
    })
    .catch(err => {
      console.log(err);
    });
  };

  const location = useLocation();
  // console.log()

  const b_location = location.state.browse_location;
  const s_location = location.state.submission_location;
  const a_location = location.state.audition_location;

  // console.log(b_location);
  // console.log(s_location);
  // console.log(a_location);

  const handleSelect = async () => {
    const data = await fetch(`http://localhost:5000/project/SelectuserId/${location.state.userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ select })
    })
    const res = await data.json();
    // console.log(res)
  }

  const handleReject = async () => {
    const data = await fetch(`http://localhost:5000/project/SelectuserId/${location.state.userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ select:rejected })
    })
    const res = await data.json();
    console.log(res)
  }

  const handleShortlist = async () => {
    const data = await fetch(`http://localhost:5000/project/SelectuserId/${location.state.userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ select:shortlist})
    })
    const res = await data.json();
    console.log(res)
  }

  const handleSchedule = async () => {
    const data = await fetch(`http://localhost:5000/project/SelectuserId/${location.state.userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ select:schedule})
    })
    const res = await data.json();
    console.log(res)
  }

  return (
    <>
      <div className={modal ? `dim` : ""}>
        <div>
          <Topbar />
        </div>
        <div className="container-fluid my-3  userPfp ">
          <div className="row">
            <div className="left_pfp col-lg-3 col-md-3 col-12 shadow">
              <figure>
                <img src={pfp} alt="" className="w-100" />
              </figure>
              <div className="small_img">
                <figure>
                  <img src={pfp} className="m-1" alt="" />
                  <img src={pfp} className="m-1" alt="" />
                  <img src={pfp} className="m-1" alt="" />
                  <img src={pfp} className="m-1" alt="" />
                  <img src={pfp} className="m-1" alt="" />
                  <img src={pfp} className="m-1" alt="" />
                  <img src={pfp} className="m-1" alt="" />
                  <img src={pfp} className="m-1" alt="" />
                  <span> + 5</span>
                </figure>
              </div>
            </div>
            <div className="right_pfp col-lg-9 col-md-9 col-12">
              <div className="shadow child_user mx-2">
                <div className="p-4 pb-0">
                  <div className="p1 d-flex justify-content-between">
                    <div>
                      <h6>{location.state.basicInfo.fullname}</h6>
                      <p>Actor</p>
                    </div>
                    <div>
                      {("/submission" === "/submission" ||
                        "/audition" === "/audition") && (
                          <>
                            <button
                              onClick={() => {
                                setModal(true)
                                handleSelect()
                              }
                              }
                              style={{ color: "#6cc592", borderColor: "#6cc592" }}
                            >
                              Select
                            </button>
                            <button
                              onClick={() =>
                                 {
                                   setModal(true) 
                                   handleShortlist()
                                }
                                }
                              style={{ color: "#16bac5", borderColor: "#16bac5" }}
                            >
                              Shortlist
                            </button>
                          </>
                        )}
                      {"/audition" === "/audition" && (
                        <button onClick={() =>
                          { 
                            setModal(true)
                            handleSchedule()
                          }
                          }>Schedule</button>
                      )}
                      {("/submission" === "/submission" ||
                        "/audition" === "/audition") && (
                          <button
                            onClick={() => {
                              setModal(true)
                              handleReject()
                            }
                            }
                            style={{ color: "#b8d0eb", borderColor: "#b8d0eb" }}
                          >
                            Reject
                          </button>
                        )}

                      {"/browseprofile" === "/browseprofile" && (
                        <button onClick={() => setModal(true)}>
                          Send Request
                        </button>
                      )}
                    </div>
                  </div>
                  <hr />
                  <div className="horizontal_nav d-flex justify-content-between">
                    <span
                      onClick={() => setActive("details")}
                      className={active === "details" ? "activeUser-class" : ""}
                    >
                      Profile Details
                    </span>
                    <span
                      onClick={() => setActive("talent")}
                      className={active === "talent" ? "activeUser-class" : ""}
                    >
                      Talent Details
                    </span>
                    <span
                      onClick={() => setActive("bio")}
                      className={active === "bio" ? "activeUser-class" : ""}
                    >
                      Bio & Experience
                    </span>
                    <span
                      onClick={() => setActive("education")}
                      className={
                        active === "education" ? "activeUser-class" : ""
                      }
                    >
                      Education & Skills
                    </span>
                    <span
                      onClick={() => setActive("role")}
                      className={active === "role" ? "activeUser-class" : ""}
                    >
                      Role Preferences
                    </span>
                  </div>
                  <hr />

                  <div className="h-100">
                    {active === "details" && <Details Data={location.state.basicInfo} />}
                    {active === "talent" && <Talents Data={location.state.talent} />}
                    {active === "bio" && <BioExperience
                      Data={location.state.
                        portfolio}
                    />}
                    {active === "education" && <Education
                      Data={location.state
                      }
                    />}
                    {active === "role" && <UserRole
                      Data={location.state}
                    />}
                  </div>


                  {"/browseprofile" === "/browseprofile" && (
                    <button onClick={() => setModal(true)}>Send Request</button>
                  )}
                </div>
                {("/submission" === s_location ||
                  "/audition" === a_location) && (
                    <div className="next_bottom shadow">
                      <div className="m-4">
                        <img src={pfp} alt="next" />
                        <p>Hugh Charles</p>
                        <BsArrowRight />
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>

        {/* -------------modal----------------------------- */}
        {modal && (
          <div className="userSub_modal">
            <div className="modal_child shadow">
              <h1 className="purple_title">Request Confirmation</h1>
              <figure>
                <img src={Thumb} alt="thumb" />
              </figure>
              <p>Are you sure to send a Request to the viewed Profile?</p>
              <div className="btns">
                <button onClick={() => setModal(false)}>Cancel</button>
                <button onClick={handleApplyReq}  >Send</button>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
};

export default UserProfile;