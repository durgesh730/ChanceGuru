import React, { useState, useEffect } from "react";
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
import SubViewProfile from './SubViewProfile';
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs';

const UserProfile = () => {
  const [active, setActive] = useState("details");
  const [modal, setModal] = useState(false);
  const [modalData, setmodalData] = useState({
    msg: "",
    btn: "",
    num: 0
  })
  const [selected, setSelected] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [sheduled, setScheduled] = useState(false);
  const [shortlisted, setShortlisted] = useState(false);
  const [Inter, setInter] = useState({ date: "", time: "", interview: "", location: "" });
  // const [datalocation , setDatalocation] = useState();

  const setall = () => {
    setSelected(false);
    setRejected(false);
    setScheduled(false);
    setShortlisted(false);
  }
  const location = useLocation();

  const userData = location.state.user;
  console.log(userData, "userdata")
  const index = location.state.index;
  const card = location.state.card;
  const d = location.state.btn;
  const DateTime = location.state.project

  var id = 0;
  var userId = 0;
  card?.map((item) => {
    id = item._id;
    userId = item.userId
    console.log(item.charId, "charId")
    // console.log
  })

  console.log(id, "id")

  const setVal = (e) => {
    const { value, name } = e.target;

    setInter(() => {
      return {
        ...Inter,
        [name]: value
      }
    })
  }

  const handleInterview = async () => {
    const { date, time, interview, location } = Inter;
    const data = await fetch(`http://localhost:5000/application/DateTime/${id}`, {
      method: "Put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ date: date, time: time, interview: interview, location: location })
    })
    const res = await data.json();
    console.log(res, "hii dugeh")
  }

  const handleApplyReq = () => {
    axios.put('http://localhost:5000/profile/ReqToApp',{talentId: location.state.user.userId},{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
      
    })
      .then(res => {
        setModal(false);
      })
      .catch(err => {
        console.log(err);
      });
    
  };

  // const GetLocationByUserId = async () => {
  //   const data = await fetch(`http://localhost:5000/application/DateLocation/${userId}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //   const res = await data.json();
  //   console.log(res)
  //   setDatalocation(res)
  // };

  const handleSelect = async () => {
    const data = await fetch(`http://localhost:5000/project/Select/${card[index]._id}/${d}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const res = await data.json();
    setall();
    setSelected(true);
    setModal(false);
  };

  const handleReject = async () => {
    const data = await fetch(`http://localhost:5000/project/Reject/${card[index]._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const res = await data.json();
    setall();
    setRejected(true);
    setModal(false);
    // console.log(res);
  };

  const handleShortlist = async () => {
    const data = await fetch(`http://localhost:5000/project/Shortlist/${card[index]._id}/${d}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const res = await data.json();
    // console.log(res);
    setall();
    setShortlisted(true);
    setModal(false);
  };

  const handleSchedule = async () => {
    const data = await fetch(`http://localhost:5000/project/Schedule/${card[index]._id}/${d}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const res = await data.json();
    setall();
    setScheduled(true);
    setModal(false);
  };


  var [first, setfirst] = useState(0)
  const handleNext = () => {
    if (first < userData.photos.length - 1) {
      first = first + 1
      setfirst(first);
      // console.log(first)
    }
  }

  const handlePre = () => {
    if (first >= 1) {
      first = first - 1;
      setfirst(first);
      // console.log(first)
    }
  }

  // console.log(first)

  useEffect(() => {
    if (card[index]?.status === "selected") {
      setSelected(true);
    } else if (card[index]?.status === "scheduled") {
      setScheduled(true);
    } else if (card[index]?.status === "shortlisted") {
      setShortlisted(true);
    } else if (card[index] === "rejected") {
      setRejected(true);
    }
    // console.log(card[index])
  }, [])


  return (
    <>
      <div className={modal ? `dim` : ""}>
        <div>
          <Topbar />
        </div>
        <div className="container-fluid my-3  userPfp ">
          <div className="row">
            <div className="left_pfp col-lg-3 col-md-3 col-12">
              <div className="shadow child_user mx-2 ">

                <figure className=" userImage_main">

                  {
                    userData.photos.map((item, index) => {
                      return (
                        <>
                          {(index === first) ? <img src={item.link} alt="" /> : ("")}
                        </>
                      )
                    })
                  }
                  <div className="imageUser">
                    <BsChevronLeft onClick={handlePre} />

                    <BsChevronRight onClick={handleNext} />
                  </div>

                </figure>

                <div className="small_img">
                  <figure>
                    {
                      userData.photos?.map((img, i) => {
                        return (
                          (i > 0) ? <img src={img.link} className="m-1" alt="" /> : ("")
                        )
                      })
                    }
                    <span> + {userData.photos.length}</span>

                  </figure>

                  <figure className="d-flex" >
                    {
                      userData.videos?.map((img, i) => {
                        // console.log(img.link)
                        return (
                          <>
                            <div className="mx-2">
                              <video target="_blank" width="35" height='40' controls>
                                <source src={img.link} type="video/mp4" />
                              </video>
                            </div>
                          </>
                        )
                      })
                    }
                    <span> + 5</span>
                  </figure>
                </div>
              </div>
            </div>
            <div className="right_pfp col-lg-9 col-md-9 col-12">
              <div className="shadow child_user mx-2">
                <div className="p-4 pb-0">
                  <div className="p1 d-flex justify-content-between">
                    <div>
                      <h6>{userData?.basicInfo?.fullname}</h6>
                      <p>Actor</p>
                    </div>
                    <div>


                      <div className="tag">
                        {selected ? "Selected" : ""}{rejected ? "Rejected" : ""}{sheduled ? "Scheduled" : ""}{shortlisted ? "Shortlisted" : ""}
                      </div>
                      {d == 1 &&
                        <button className={`${selected || rejected || shortlisted || sheduled ? "d-none" : ""}`} onClick={() => { setModal(true); setmodalData({ msg: " to Shortlist the ", btn: "Shortlist", num: 1 }) }} style={{ color: "#16bac5", borderColor: "#16bac5" }}>
                          Shortlist
                        </button>
                      }

                      {card?.map((item, i) => {
                        console.log(item, 'hii')
                        return (
                          <>
                            {item.status === "scheduled"?
                                (item.audition?.map((sub, i) => {
                                  return (
                                      <>
                                          <div>
                                              <span className="mx-1" >{sub.date}</span>
                                              <span className="mx-1" >{sub.time}</span>
                                              <span className="mx-1" >{sub.location}</span>
                                              <span className="mx-1" >{sub.interviewer}</span>
                                          </div>
                                      </>
                                  )
                              }))
                              : ("")}
                          </>
                        )
                      })}


                      {d == 0 ?
                        <button onClick={() => { setModal(true); setmodalData({ msg: " send a Request to ", btn: "Send", num: 4 }) }}>
                          Send Request
                        </button>
                        :
                        <>
                          <button className={` ${selected || rejected ? "d-none" : ""} ${(d == 1 ^ (shortlisted || sheduled || selected || rejected)) ? "" : "d-none"}`} onClick={() => { setModal(true); setmodalData({ msg: " to Select the ", btn: "Select", num: 0 }) }} style={{ color: "#6cc592", borderColor: "#6cc592" }}>
                            Select
                          </button>
                          <button className={`${selected || rejected || (sheduled || shortlisted && d == 1) ? "d-none" : ""}`} onClick={() => { setModal(true); setmodalData({ msg: " to send a Schedule to ", btn: "Schedule", num: 2 }) }}>
                            Schedule
                          </button>
                          <button className={` ${selected || rejected ? "d-none" : ""} ${(d == 1 ^ (shortlisted || sheduled || selected || rejected)) ? "" : "d-none"}`} onClick={() => { setModal(true); setmodalData({ msg: " Reject the", btn: "Reject", num: 3 }) }} style={{ color: "#b8d0eb", borderColor: "#b8d0eb" }} >
                            Reject
                          </button>
                        </>
                      }
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
                    {active === "details" && <Details Data={userData.basicInfo} />}
                    {active === "talent" && <Talents Data={userData.talent} />}
                    {active === "bio" && <BioExperience
                      Data={userData.portfolio}
                    />}
                    {active === "education" && <Education
                      Data={userData
                      }
                    />}
                    {active === "role" && <UserRole
                      Data={userData}
                    />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* -------------modal----------------------------- */}
      {modal && (
        <div className="userSub_modal">
          <div className="modal_child shadow">

            <div className="d-flex my-4 " >

              <div className="my-2" >
                <div>
                  <label>Location</label> <br />
                  <input type='time' name="time" value={Inter.time} onChange={setVal} ></input>
                </div>

                <div>
                  <label>Interviewer Name</label> <br />
                  <input name="interview" value={Inter.interview} onChange={setVal}  ></input>
                </div>
              </div>

              <div className="d-flex my-2 mx-4 " >
                <div>
                  <select name="date" value={Inter.date} onChange={setVal}  >
                    <option selected >Date</option>
                    {
                      DateTime?.DateTime?.map((item, i) => {
                        return (
                          <>
                            <option key={i} >{item.date}</option>
                          </>
                        )
                      })
                    }
                  </select>
                </div>

                <div className="mx-2">
                  <select name="location" value={Inter.location} onChange={setVal}  >
                    <option selected>Location</option>
                    {
                      DateTime?.DateTime?.map((item, i) => {
                        return (
                          <>
                            <option key={i} >{item.location}</option>
                          </>
                        )
                      })
                    }
                  </select>
                </div>
              </div>
            </div>

            <h1 className="purple_title">Request Confirmation</h1>
            <figure>
              <img src={Thumb} alt="thumb" />
            </figure>
            <p>Are you sure to {modalData.msg} viewed Profile?</p>
            <div className="btns">
              <button onClick={() => setModal(false)}>Cancel</button>
              <button onClick={() => {
                if (modalData.num === 0) {
                  handleSelect();
                } else if (modalData.num == 1) {
                  handleShortlist();
                } else if (modalData.num == 2) {
                  handleSchedule();
                  handleInterview()
                } else if (modalData.num == 3) {
                  handleReject();
                } else {
                  handleApplyReq();
                }
              }}  >{modalData.btn}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
