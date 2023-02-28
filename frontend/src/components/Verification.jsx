import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "./AuthContext";
import "./style.css";
import backimg from "../assets/images/kamal.jpeg";
import logo from "../assets/images/logo1.svg";

import { authentication } from "./firebase-config";
import {
    createUserWithEmailAndPassword,
    RecaptchaVerifier,
    signInWithPhoneNumber,
    sendEmailVerification,
    updateProfile,
} from "firebase/auth";

const Login = () => {
    const [Otp, setOtp] = useState("");
    const navigate = useNavigate();
    const { currentUser } = useAuthValue();
    console.log(currentUser);

    const changeOtp = (e) => {
        let otp = e.target.value;
        setOtp(otp);
    };

  
    

    const verifyOtp = (e) => {
        e.preventDefault();

        let invalidotp = document.getElementById("invalid-otp");
        let correctotp = document.getElementById("correct-otp");
        invalidotp.style.display = "none";
        correctotp.style.display = "none";
        let otp = Otp;

        console.log(otp);
        if (otp.length == 6) {
            let confirmationResult = window.confirmationResult;
            confirmationResult
                .confirm(otp)
                .then((result) => {
                    // User signed in successfully.
                    const user = result.user;
                    console.log("Success");
                    correctotp.style.display = "block";
                    invalidotp.style.display = "none";
                    setTimeout(() => {
                        navigate("/emailverify");
                    }, 3000);
                })
                .catch((error) => {
                    // User couldn't sign in (bad verification code?)
                    console.log(error);
                    console.log("Invalid OTP");
                    correctotp.style.display = "none";
                    invalidotp.style.display = "block";
                });
        }
    };
    return (
        <>
            <div className="login-container row">
                <div className="left-side col-5">
                    <div className="top-left d-flex align-items-center">
                        <i className="bi bi-arrow-left"></i>
                        <p className="px-3 m-0">Verification</p>
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
                    <form onSubmit={verifyOtp} className="form-container" id="verify-form">
                        <img src={logo} alt="" className="form-logo" />
                        <div className="text-center my-2">
                            <p className="my-1">
                                <b>Verify Mobile Number</b>
                            </p>
                            <span className="secondary-text">
                                Enter the OTP recived on the registerd mobile number <b>{}</b>
                            </span>
                        </div>
                        <input
                            className="form-control"
                            type="text"
                            maxLength="6"
                            pattern="[0-9]*"
                            autocomplete="off"
                            required
                            value={Otp}
                            onChange={changeOtp}
                        />

                        <div id="invalid-otp" className="invalid-otp m-2 text-center">
                            *Invalid OTP
                        </div>
                        <div id="correct-otp" className="correct-otp m-2 text-center">
                            Correct OTP
                        </div>
                        <input type="submit" className="submit-btn btn btn-lg btn-block my-2" value="Verify" />
                        <div className="alternate-option my-5 text-center">
                            Didn’t received OTP?{" "}
                            <b>
                                <u >Resend</u>
                            </b>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
