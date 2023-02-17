import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { RiLogoutBoxRLine } from "react-icons/ri";

import "./minicomp.css";
import home from "../../assets/icons/home.svg";
import ahome from "../../assets/icons/144-home copy.svg";
import directorchair from "../../assets/icons/director-chair.svg";
import clapperboard from "../../assets/icons/clapperboard.svg";
import thumbsup from "../../assets/icons/Group 156.svg";
import notification from "../../assets/icons/211-notification.svg";
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

const Topbar = (props) => {
  const [profileHeight, setProfileHeight] = useState(0);
  const [notifHeight, setnotifHeight] = useState(0);
  const [dim, setDim] = useState(0);

  const navigate = useNavigate();

  function toggleProfileOptions() {
    if (profileHeight == 0) {
      setProfileHeight(192);
      setDim(1);
      document.getElementById("profileOption").style.height = "192px";
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

  function handleLogout() {
    localStorage.clear();
    navigate("/login");
    console.log("Logout succesfull");
  }

  const user = JSON.parse(localStorage.getItem("login"));

  const [active, setActive] = useState("home");
  console.log(active);

  return (
    <>
      <div className="topbar">
        <div className="topbar-name">
          Chance <br /> Guru
        </div>

        <div className="topbar-nav">
          <Link
            to={user.type === "user" ? "/talentdashboard" : "/seekerdashboard"}
            onClick={() => setActive("home")}
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
          <Link to="/submission" onClick={() => setActive("chair")}>
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
              onClick={() => setActive("mask")}
            >
              {active === "mask" ? (
                <img className="topbar-icons" src={amask} alt="" />
              ) : (
                <img className="topbar-icons" src={mask} alt="" />
              )}
            </span>
          </Link>

          <Link to="/browseprofile" onClick={() => setActive("fingers")}>
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
          <span
            className={
              active === "chat"
                ? `nav_active topbar-icons-container`
                : "topbar-icons-container"
            }
            onClick={() => setActive("chat")}
          >
            {active === "chat" ? (
              <img className="topbar-icons" src={achat} alt="" />
            ) : (
              <img className="topbar-icons" src={chat} alt="" />
            )}
          </span>
          {/*
                        <Link to="/projectcreation"> */}
          <span
            className="topbar-icons-container n_icon"
            onClick={toggleNotifOption}
          >
            {active === "notification" ? (
              <img className="topbar-icons" src={anotification} alt="" />
            ) : (
              <img className="topbar-icons " src={notification} alt="" />
            )}
            <div className="notif-options" id="notifOption">
              <div>
                <div>
                  <img src="" alt="pfp" />
                  <p>
                    You have successfully created the project "Shakespeare's
                    Macbeth"
                  </p>
                </div>
                <hr />
                <div>
                  <img src="" alt="pfp" />
                  <p>
                    You have successfully created the project "Shakespeare's
                    Macbeth"
                  </p>
                </div>
                <hr />

                <div>
                  <img src="" alt="pfp" />
                  <p>
                    You have successfully created the project "Shakespeare's
                    Macbeth"
                  </p>
                </div>
                <hr />
                <div className="d-flex justify-content-center align-items-center view_all">
                  <NavLink to="/notification">
                    <p>View All</p>
                  </NavLink>
                </div>
              </div>
            </div>
          </span>

          <span
            className="d-flex align-items-center cursor-pointer"
            onClick={toggleProfileOptions}
          >
            <span className="topbar-icons-container">
              <img
                className="topbar-icons topbar-profile"
                src={profile}
                alt=""
              />
            </span>
            <span className="top-profile-name">{user.username}</span>
            <div className="profile-options" id="profileOption">
              <ul>
                <li>
                  <Link to="/profiledetails">My Profile</Link>
                </li>
                <li>
                  <NavLink to="/setting">Account Settings</NavLink>
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
          <div className={modal || dim ? `dim blur_black` : "blur_black"}></div>
          {modal && (
            <div className="userSub_modal">
              <div className="modal_child shadow">
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
