import React from "react";
import "./style.css";
import { useAuthValue } from "./AuthContext";
import { useState, useEffect } from "react";
import { authentication } from "./firebase-config";
import { sendEmailVerification } from "firebase/auth";
import { useNavigate , Link } from "react-router-dom";

import backimg from "../assets/images/kamal.jpeg";
import logo from "../assets/images/logo1.svg";
import elogo from "../assets/images/email1.svg";

const VerifyEmail = () => {
    const { currentUser } = useAuthValue();
    const { timeActive, setTimeActive } = useAuthValue();
    const [time, setTime] = useState(60);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            currentUser
                ?.reload()
                .then(() => {
                    if (currentUser?.emailVerified) {
                        clearInterval(interval);
                        navigate("/");
                    }
                })
                .catch((err) => {
                    alert(err.message);
                });
        }, 1000);
    }, [navigate, currentUser]);

    useEffect(() => {
        let interval = null;
        if (timeActive && time !== 0) {
            interval = setInterval(() => {
                setTime((time) => time - 1);
            }, 1000);
        } else if (time === 0) {
            setTimeActive(false);
            setTime(60);
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [timeActive, time, setTimeActive]);

    const resendEmailVerification = () => {
        sendEmailVerification(authentication.currentUser)
            .then(() => {
                setTimeActive(true);
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    return (
        <>
            <div className="login-container row">
                <div className="left-side col-5">
                    <div className="top-left d-flex align-items-center">
                        <i className="bi bi-arrow-left"></i>
                        <p className="px-3 m-0">Signup</p>
                    </div>
                    <img className="login-img" src={backimg} alt="" />
                    <div className="login-footer">
                        <div className="open-quote">“</div>
                        <div className="quote">
                            I’m a 21st century man. I don’t belive in magic. I belive in sweat, tears, life and death.
                        </div>
                        <div className="author">kamal haasan</div>
                        <div className="close-quote">”</div>
                        <div className="three-dots">
                            <i className="fa-solid fa-circle mx-1"></i>
                            <i className="fa-regular fa-circle mx-1"></i>
                            <i className="fa-regular fa-circle mx-1"></i>
                        </div>
                    </div>
                </div>
                <div className="right-side col-7 d-flex align-items-center justify-content-center">
                    <div className="form-container justify-content-around h-100" style={{ width: "60%" }}>
                        <img src={logo} alt="" className="form-logo" />
                        <div className="card1">
                            <div className="row">
                                <div className="col-3 text-end">
                                    <img src={elogo} alt="" />
                                </div>
                                <div className="col-9">
                                    <span className="email-text1">A confirmation link has sent to</span>
                                    <span className="email-text2">
                                        <span>{currentUser?.email} your email address.</span>
                                    </span>
                                </div>
                            </div>
                            <div className="text-center mt-4 email-text3">
                                Click on the link in your email to activate your account
                            </div>
                        </div>
                        <div className="card1">
                            Verified but not redirected ? <Link to="/login">Click Here</Link>
                        </div>
                        <div className="alternate-option my-5 text-center">
                            Didn’t recived the link yet?{" "}
                            <b>
                                <u onClick={resendEmailVerification} disabled={timeActive}>
                                    Resend Email {timeActive && time}
                                </u>
                            </b>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VerifyEmail;
