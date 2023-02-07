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
import ProfileDetails from "./components/ProfileDetails";
import ProjectCreation from "./components/ProjectCreation";
import Roles from "./components/Roles";
import ApplicantDetails from "./components/ApplicantDetails";

import ChatPage from "./components/ChatPage";
import ChatProvider from "./components/Context/ChatProvider";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [timeActive, setTimeActive] = useState(false);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("login"));
    if (user) {
      setCurrentUser(user);
      console.log(user);
    }
  }, []);

  return (
    <Router>
      <AuthProvider value={{ currentUser, timeActive, setTimeActive }}>
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
          <Route path="/roles" element={<Roles />} />
          <Route path="/applicantdetails" element={<ApplicantDetails />} />
          <Route
            path="/chat"
            element={
              <ChakraProvider>
                <ChatProvider>
                  <ChatPage />
                </ChatProvider>
              </ChakraProvider>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
