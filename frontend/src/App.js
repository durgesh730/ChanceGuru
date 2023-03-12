import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./components/AuthContext";
import { useState, useEffect } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Verification from "./components/Verification";
import EmailVerification from "./components/EmailVerification";
import Web1 from "./components/Web1";
import { authentication } from "./components/firebase-config";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import VerifyEmail from "./components/verifyEmail";
import TalentDashboard from "./components/TalentDashboard";
import SeekerDashboard from "./components/SeekerDashboard";
import RolesDashboard from "./components/RolesDashboard";
import ProfileDetails from "./components/ProfileDetails";
import ProjectCreation from "./components/ProjectCreation";
import Roles from "./components/Roles";
import ApplicantDetails from "./components/ApplicantDetails";
import BrowseProfile from "./components/BrowseProfile";
import UserProfile from "./components/UserProfile";
import Audition from "./components/Audition";
import Submission from "./components/Submission";
import Notification from "./components/Notification";
import Setting from "./components/Setting";
import FaqsHelp from "./components/FaqsHelp";
import MyRoles from "./components/MyRoles";
import RequestPage from "./components/RequestPage";

import TalentNotification from "./components/TalentNotification";


import ChatProvider from "./components/Context/ChatProvider";

import ChatPage1 from "./components/ChatPage1";
import "./components/responsive.css"
import Myapplication from "./components/Myapplication";


function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [timeActive, setTimeActive] = useState(false);
    const [clicked, setClicked] = useState(0);
    const [active, setActive] = useState("home");
    const [notificationCount,setNotificationCount] = useState(4)


    const [chatUnReadCount,setChatUnReadCount] = useState(0)

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("login"));
    if (user) {
      setCurrentUser(user);
      // console.log(user);
    }
  }, []);

  return (
    <Router>
      <AuthProvider
        value={{ currentUser, timeActive, setTimeActive, setClicked, clicked, active,setActive, notificationCount,setNotificationCount, chatUnReadCount,setChatUnReadCount }}
      >
        <Routes>
          <Route
            path="/logintest"
            element={
              !currentUser?.emailVerified ? (
                <Login />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/register"
            element={
              !currentUser?.emailVerified ? (
                <Signup />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route path="/profiledetails" element={<ProfileDetails />} />
          <Route path="/projectcreation" element={<ProjectCreation />} />
          <Route path="/talentdashboard" element={<TalentDashboard />} />
          <Route path="/seekerdashboard" element={<SeekerDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/emailverify" element={<EmailVerification />} />
          <Route path="/" element={<Web1 />} />
          <Route path="/rolesdashboard" element={<RolesDashboard />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/applicantdetails" element={<ApplicantDetails />} />
          <Route path="/browseprofile" element={<BrowseProfile />} />
          <Route path="/browseprofile/:user" element={<UserProfile />} />
          <Route path="/submission" element={<Submission />} />
          <Route path="/audition" element={<Audition />} />
          <Route path="/notification" element={currentUser?.type === "seeker" ? <Notification /> : <TalentNotification />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/help" element={<FaqsHelp />} />
          <Route path="/myrole" element={<MyRoles />} />
          <Route path="/requestpage" element={<RequestPage />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/applicantdetails" element={<ApplicantDetails />} />
          <Route path="/myapplication" element={<Myapplication />} />
          <Route
            path="/chat"
            element={
              <ChatProvider>
                <ChatPage1 />
              </ChatProvider>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
