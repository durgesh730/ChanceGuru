import React, { useEffect, useRef, useState, useContext } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import { FaBars } from "react-icons/fa";



import "./minicomp.css";
import home from "../../assets/icons/home.svg";
import ahome from "../../assets/icons/144-home copy.svg";
import directorchair from "../../assets/icons/director-chair.svg";
import clapperboard from "../../assets/icons/clapperboard.svg";
import thumbsup from "../../assets/icons/Group 156.svg";
import notification from "../../assets/icons/211-notification.png";
import chat from "../../assets/icons/045-chat-1.svg";
import profile from "../../assets/icons/profile1.svg";
import mask from "../../assets/icons/Group 110.svg";

import achair from "../../assets/icons/active-chair.svg";
import achat from "../../assets/icons/active-chat.svg";
import afingers from "../../assets/icons/active-fingers.svg";
import amask from "../../assets/icons/active-mask.svg";
import anotification from "../../assets/icons/active-notification.svg";
import role from "../../assets/images/role.png";
import arole from "../../assets/images/active-role.png";
import requests from "../../assets/icons/request.png";
import arequests from "../../assets/icons/active-request.png";
import axios from "axios";
import server from '../server';
import { RiAccountCircleFill } from 'react-icons/ri';

import AuthContext from "../AuthContext";




const Topbar = (props) => {
  const [profileHeight, setProfileHeight] = useState(0);
  const [notifHeight, setnotifHeight] = useState(0);
  const [dim, setDim] = useState(0);
  const [projects, setProjects] = useState([]);
  const [toggleNav, settoggleNav] = useState(false)


  let location = useLocation()

  const auth = useContext(AuthContext)
  const active = auth.active

  let { socket, setSocket, setSocketConnected, setIsTyping, chatUnReadCount, setChatUnReadCount, getunreadonTopbar } = auth
  const user = JSON.parse(localStorage.getItem("login"));
  const navigate = useNavigate();



  useEffect(() => {
    // setSocket(prev => prev = io(ENDPOINT));
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));


    socket.off("setNotify").on("setNotify", (chat) => {
      console.log("Topbar.jsx 55 :", chat)
      if (location.pathname != "/chat") {

        console.log("Topbar 86 Setting chat unread count")
        setChatUnReadCount((prev) => {
          console.log(prev);
          return prev + 1
        })
        incrementChatCount([chat])
      }
    })

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    localStorage.setItem("UnReadNotify", JSON.stringify(chatUnReadCount))
  }, [chatUnReadCount])


  function toggleProfileOptions() {
    if (profileHeight == 0) {
      setProfileHeight(270);
      setDim(1);
      document.getElementById("profileOption").style.height = "fit-content";
    } else {
      setProfileHeight(0);
      setDim(0);
      document.getElementById("profileOption").style.height = "0px";
    }
  }
  function toggleNotifOption() {
    if (notifHeight == 0) {
      setnotifHeight(265);
      setDim(1);

      document.getElementById("notifOption").style.height = "265px";
    } else {
      setnotifHeight(0);
      setDim(0);

      document.getElementById("notifOption").style.height = "0px";
    }
  }

  const [modal, setModal] = useState(false);

  const incrementChatCount = (localChats) => {
    if (localChats && localChats.length > 0) {
      localChats.map(async (item) => {
        console.log(item)
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          };
          await axios.put(
            `${server}/api/chat/incrChat`,
            { item },
            config
          )
            .then((response) => {
              console.log(response)
            });

        } catch (error) {
          console.log(error.message);
        }

      }

      )
    }
  }

  function handleLogout() {

    localStorage.clear();
    navigate("/login");
    console.log("Logout succesfull");
  }





  const [jobs, setJobs] = useState();
  const [jobProjects, setJobProjects] = useState([]);
  const [jobUsers, setJobUsers] = useState([]);

  const dataFetchedRef = useRef(false);
  const [userProjectMap, setUserProjectMap] = useState([]);
  const [ForIds, setForIds] = useState()

  const [jobRoles, setJobRoles] = useState([])

  const getProjects = async () => {
    const res = await fetch(
      `${server}/project/allProjectsSeekers`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const response = await res.json();
    if (response !== null) {
      setProjects(response);
    }
  };

  const getJobapplicationIds = async () => {
    const res = await fetch(`${server}/application/allJobsUser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const response = await res.json();
    setForIds(response)
  };

  const getJobApplications = async () => {
    const res = await fetch(`${server}/application/allJobsSeeker`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const response = await res.json();

    setJobs(response);

    getUsers(response);
    getJobProjects(response);
  };

  function getUsers(jobs) {
    jobs?.map((job, index) => {
      axios
        .get(`${server}/project/UserId/${job.userId}`)
        .then((res) => {
          if (res !== null) {
            setJobUsers((oldUsers) => [...oldUsers, res.data]);
          }
          // console.log(res.data)
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  function getJobProjects(jobs) {
    jobs?.map((job, index) => {
      axios
        .get(`${server}/project/projectDetails/${job.pId}`)
        .then((res) => {
          if (res !== null) {
            setJobProjects((oldProjects) => [...oldProjects, res.data]);
          }
          // console.log(res.data)
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  const getUnReadCount = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };

      await axios.get(
        `${server}/api/chat/getUnreadCount`,
        config
      )
        .then((response) => {
          console.log(response)
          setChatUnReadCount(response.data)

        });

    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    getProjects();
    getJobapplicationIds();
    getJobApplications();
    let localUnReadCount = JSON.parse(localStorage.getItem("UnReadNotify"))
    if (!localUnReadCount) { getUnReadCount() }
    else {
      auth.setChatUnReadCount(localUnReadCount)
    }
  }, []);

  useEffect(() => {
    if (jobUsers.length == 0 || jobProjects.length == 0) {
      return
    }
    let len = jobProjects.length === jobUsers.length ? jobProjects.length : 0;
    let arr = new Set()
    let imgArr = new Set()

    for (let index = 0; index < len; index++) {

      const userName = jobUsers[index][0].username;
      const projectName = jobProjects[index][0].basicInfo.name;
      const image = jobUsers[index][0].link;

      let mapObj = {
        user: userName,
        project: projectName,
      }
      arr.add({ notification: `${mapObj.user} has applied to project ${mapObj.project}`, img: image })
    }
    // console.log(arr)
    setUserProjectMap([...arr])
  }, [jobUsers, jobProjects])

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("login")));
  }, []);

  // ============talent=========================
  const [jobsTalent, setJobsTalent] = useState([])
  const [jobRolesTalent, setJobRolesTalent] = useState([])
  const [rolesNotification, setRolesNotification] = useState([])
  const [views, setViews] = useState([])
  const [viewUsers, setViewUsers] = useState([])
  const [viewsNotification, setViewNotification] = useState([])
  const [loggedUser, setLoggedUser] = useState("");


  const dataFetchedRefTalent = useRef(false);


  const getJobApplicationsTalent = async () => {
    const res = await fetch(
      `${server}/application/allJobsUser`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const response = await res.json();
    setJobsTalent(response)
    getJobRolesTalent(response)
  }

  function getUsersTalent(views) {

    views?.map((view, index) => {
      console.log(view)
      axios
        .get(`${server}/project/UserId/${view.seekerId}`)
        .then((res) => {
          if (res !== null) {
            setViewUsers(oldUsers => [...oldUsers, res.data])
          }
        })
        .catch((err) => {
          console.log(err);
        })

    })
  }

  function getJobRolesTalent(jobsTalent) {
    jobsTalent?.map((job, index) => {

      axios.get(`${server}/project/getCharacter/${job.roleId}`)
        .then((res) => {

          console.log(res.data)
          setJobRolesTalent(oldRoles => [...oldRoles, res.data])


        })
        .catch((err) => {
          console.log(err);
        })
    })
  }

  const [count, setCount] = useState([]);
  var arr = [];

  // =============== getreq count ========================

  const getreqcount = async () => {
    const res = await fetch(`${server}/auth/reqcount`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const response = await res.json();
      setCount((prev)=>[...prev, response])
    arr.push({ res: response })
    console.log(arr, "arrrr")
  };

  console.log(count, "fdsadfghj")


  const getReqToApp = () => {
    axios.get(`${server}/profile/reqToApp/${user._id}`)
      .then((res) => {
        setViews(res.data)
        getUsersTalent(res.data)

      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (dataFetchedRefTalent.current) return;
    dataFetchedRefTalent.current = true;
    getJobApplicationsTalent()
    getReqToApp()

  }, [])

  useEffect(() => {
    let roles = new Set()
    jobRolesTalent?.map((job) => {
      job?.map((item) => {
        roles.add(`${item.roles[0].role} in ${item.basicInfo.name}`)
      })
    })
    let rolesArr = [...roles]
    rolesArr.reverse()
    setRolesNotification(rolesArr)
  }, [jobRolesTalent])

  useEffect(() => {
    let roles = new Set()
    viewUsers?.map((view) => {
      view?.map((item) => {
        roles.add({ "notification": item.username, "img": item.link })
      })
    })
    let viewsArr = [...roles]
    viewsArr.reverse()
    setViewNotification(viewsArr)
  }, [viewUsers])

  const handleNavbar = () => {
    if (toggleNav) {
      document.querySelector(".topbar-nav").style.display = "none";
      settoggleNav(false);

    }
    else {
      document.querySelector(".topbar-nav").style.display = "flex";
      settoggleNav(true)
    }
  }

  useEffect(() => {
    if (getunreadonTopbar.current < 1) {
      getUnReadCount()
      getunreadonTopbar.current++
    }

    getreqcount();
  }, [])

  if (rolesNotification.length <= 2 && viewsNotification.length <= 2) {
    auth.setNotificationCount(rolesNotification.length + viewsNotification.length)
  }
  else {
    auth.setNotificationCount(4)
  }


  if (projects.length <= 2 && userProjectMap.length <= 2) {
    auth.setNotificationCountSeeker(projects.length + userProjectMap.length)
  }
  else {
    auth.setNotificationCountSeeker(4)
  }



  return (
    <>
      <div className="topbar">
        <div className="topbar-name">
          Chance <br /> Guru
          <span className="navToggle" onClick={handleNavbar}>
            {toggleNav ? <AiOutlineClose /> : <FaBars />}
          </span>
        </div>

        <div className="topbar-nav">
          <Link
            to={user.type === "user" ? "/talentdashboard" : "/seekerdashboard"}
            onClick={() => auth.setActive("home")}
            state={null}
          >
            <span
              className={
                active === "home"
                  ? `nav_active topbar-icons-container`
                  : "topbar-icons-container"
              }
            >
              {active === "home" ? (
                <img className="topbar-icons" src={ahome} alt="" />
              ) : (
                <img className="topbar-icons" src={home} alt="" />
              )}
            </span>
          </Link>
          {
            user.type === "seeker" || user.type === "admin" ? (
              <>
                <Link to="/submission" onClick={() => auth.setActive("chair")}>
                  <span
                    className={
                      active === "chair"
                        ? `nav_active topbar-icons-container`
                        : "topbar-icons-container"
                    }
                  >
                    {active === "chair" ? (
                      <img className="topbar-icons" src={achair} alt="" />
                    ) : (
                      <img className="topbar-icons" src={directorchair} alt="" />
                    )}
                  </span>
                </Link>

                <Link to="/rolesdashboard">
                  <span
                    className={
                      active === "mask"
                        ? `nav_active topbar-icons-container`
                        : "topbar-icons-container"
                    }
                    onClick={() => auth.setActive("mask")}
                  >
                    {active === "mask" ? (
                      <img className="topbar-icons" src={amask} alt="" />
                    ) : (
                      <img className="topbar-icons" src={mask} alt="" />
                    )}
                  </span>
                </Link>
                <Link to="/browseprofile" onClick={() => auth.setActive("fingers")}>
                  <span
                    className={
                      active === "fingers"
                        ? `nav_active topbar-icons-container`
                        : "topbar-icons-container"
                    }
                  >
                    {active === "fingers" ? (
                      <img className="topbar-icons" src={afingers} alt="" />
                    ) : (
                      <img className="topbar-icons" src={thumbsup} alt="" />
                    )}
                  </span>
                </Link>
              </>

            )
              :
              (
                <Link to="/myrole">
                  <span
                    className={
                      active === "mask"
                        ? `nav_active topbar-icons-container`
                        : "topbar-icons-container"
                    }
                    onClick={() => auth.setActive("mask")}
                  >
                    {active === "mask" ? (
                      <img className="topbar-icons" src={arole} alt="" />
                    ) : (
                      <img className="topbar-icons" src={role} alt="" />
                    )}
                  </span>
                </Link>
              )
          }




          {
            user.type !== 'admin' ?
              (<Link to="/chat">
                <span
                  className={
                    active === "chat"
                      ? `nav_active topbar-icons-container bubbleDiv bubbleColorChange`
                      : "topbar-icons-container bubbleDiv"
                  }
                  onClick={() => auth.setActive("chat")}
                >
                  {active === "chat" ? (
                    <img className="topbar-icons" src={achat} alt="" />
                  ) : (
                    <img className="topbar-icons" src={chat} alt="" />
                  )}

                  {chatUnReadCount > 0 && <h6>{chatUnReadCount}</h6>}
                </span>
              </Link>) : ("")
          }

          {
            user.type === "user"
            &&
            <Link to="/requestpage">
              <span
                className={
                  active === "request"
                    ? `nav_active topbar-icons-container bubbleDiv bubbleColorChange`
                    : "topbar-icons-container bubbleDiv"
                }
                onClick={() => auth.setActive("request")}
              >
                {active === "request" ? (
                  <img className="topbar-icons" src={arequests} alt="" />
                ) : (
                  <img className="topbar-icons" src={requests} alt="" />
                )}

                <h6>{count?.isMarked === false || count?.isMarked === null ? (count.length === undefined) ? 1 : count.length : 0}</h6>
              </span>
            </Link>
          }


          {/* <Link to="/projectcreation"> */}

          <span
            className={
              active === "notification"
                ? `topbar-icons-container n_icon bubbleDiv bubbleColorChange`
                : "topbar-icons-container n_icon  bubbleDiv"
            }
            onClick={() => { toggleNotifOption(); auth.setActive("notification") }}
          >
            {active === "notification" ? (
              <img className="topbar-icons" src={anotification} alt="" />
            ) : (
              <img className="topbar-icons " src={notification} alt="" />
            )}
            {
              user.type === "user" ?

                auth.notificationCount !== 0 ?
                  <h6>{auth.notificationCount}</h6> : ""

                :

                auth.notificationCountSeeker !== 0 ?
                  <h6>
                    {auth.notificationCountSeeker}</h6> : ""

            }
            {/* {auth.notificationCount !== 0 ? <h6>{auth.notificationCount}</h6> : ""} */}

            <div className="notif-options" id="notifOption">
              {user.type === 'user' ?

                <div>
                  {rolesNotification?.slice(0, 2).map((roleName, index) => {
                    return (
                      <>
                        <div key={index}>
                          <img src={loggedUser.link === undefined ? profile : loggedUser.link} alt="pfp" />
                          <p>
                            You have successfully applied for the role {roleName}
                          </p>
                        </div>
                        <hr />
                      </>
                    );
                  })}
                  {viewsNotification?.slice(0, 2).map((item, i) => {
                    return (
                      <>
                        <div key={i} className="d-flex align-items-center">
                          <img src={item.img === undefined ? profile : item.img} alt="pfp" className="me-4 shadow-sm" />

                          {item.notification} has viewed your profile
                        </div>
                        <hr />
                      </>
                    );
                  })
                  }

                </div>

                :
                <div>
                  {projects?.slice(0, 2).map((project, index) => {
                    return (
                      <>
                        <div key={index}>
                          <img src={loggedUser.link === undefined ? profile : loggedUser.link} alt="pfp" />
                          <p>
                            You have successfully created the project{" "}
                            {project.basicInfo.name}
                          </p>
                        </div>
                        <hr />
                      </>
                    );
                  })}
                  {userProjectMap?.slice(0, 2).map((item, i) => {
                    return (
                      <>
                        <div key={i} className="d-flex align-items-center">
                          <img src={item.img === undefined ? profile : item.img} alt="pfp" className="me-4 shadow-sm" />

                          <p>{item.notification}</p>
                        </div>
                        <hr />
                      </>
                    );
                  })
                  }

                </div>
              }
              <div className="d-flex justify-content-center align-items-center view_all">
                <NavLink to="/notification" onClick={() => auth.setNotificationCount(0)} >
                  <p>View All</p>
                </NavLink>
              </div>
            </div>
          </span>

          <span
            className="d-flex align-items-center cursor-pointer position-relative"
            onClick={toggleProfileOptions}
          >
            <span className="topbar-icons-container">

              {
                (loggedUser.link) ? <img
                  className="topbar-icons topbar-profile p-0"
                  src={loggedUser.link}
                  alt=""

                /> : (
                  <RiAccountCircleFill style={{ fontSize: "2rem" }} />
                )
              }
            </span>
            <span className="top-profile-name">{user.username}</span>
            <div className="profile-options" id="profileOption">
              <ul>
                {
                  user.type == "user" ?
                    (
                      <>
                        <li>
                          <Link to="/profiledetails">My Profile</Link>
                        </li>
                        <li>
                          <NavLink to="/myapplication" state={ForIds} exect >My Applications</NavLink>
                        </li>

                      </>
                    )
                    : (
                      <></>
                    )
                }

                <li>
                  <NavLink to="/skills" exect >Skills</NavLink>
                </li>
                <li>
                  <NavLink to="/adminroles">Roles</NavLink>
                </li>

                <li>
                  <NavLink state={loggedUser} to="/setting" exect >Account Settings</NavLink>
                </li>
                <li>
                  <NavLink to="/help">FAQ's & Help</NavLink>
                </li>
                <li onClick={() => setModal(true)}>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </span>

          {/* </Link> */}
          {/* <div className={modal || dim ? `dim blur_black` : "blur_black"}></div> */}
          {modal && (
            <div className="userSub_modal my-4 ">
              <div className="modal_child shadow ">
                <div className="d-flex justify-content-start align-items-center m-3">
                  <h1 className="purple_title m-0" style={{ fontSize: "30px" }}>
                    Logout Confirmation
                  </h1>
                  <RiLogoutBoxRLine style={{ fontSize: "30px" }} />
                </div>

                <p>Are you sure,you want to Logout?</p>
                <div className="btns">
                  <button onClick={() => setModal(false)}>Cancel</button>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Topbar;
