import React, { useState, useEffect } from "react";
import { authentication } from "./firebase-config";
import {
    createUserWithEmailAndPassword,
    RecaptchaVerifier,
    signInWithPhoneNumber,
    sendEmailVerification,
    updateProfile,
} from "firebase/auth";
import PhoneInput from "react-phone-number-input";
import { async } from "@firebase/util";
import { useAuthValue } from "./AuthContext";
import { useNavigate } from "react-router-dom";

import "react-phone-number-input/style.css";
import "./style.css";
import backimg from "../assets/images/kamal.jpeg";
import logo from "../assets/images/logo1.svg";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();
    const { setTimeActive } = useAuthValue();
    const [errorMsg, setErrorMsg] = useState("");
    const [phone, setPhone] = useState("+911234567890");
    const [values, setValues] = useState({
        username: "",
        email: "",
        pass: "",
        repass: "",
        uType:""
    });


    const validatePassword = () => {
        let isValid = true;
        if (values.pass !== "" && values.repass !== "") {
            if (values.pass !== values.repass) {
                isValid = false;
                setErrorMsg("Passwords does not match");
                console.log(isValid);
            }
        }
        return isValid;
    };

    const setUpRecaptcha = (number) => {
        window.recaptchaVerifier = new RecaptchaVerifier(
            "recaptcha-container",
            {
                size: "invisible",
                callback: (response) => {
                    // reCAPTCHA solved, allow signInWithPhoneNumber.
                },
            },
            authentication
        );
    };

    const { username,email,pass,uType} = values;
    const uTypeValue = uType;
    

    const getOtp = (e) => {
        e.preventDefault();
        setErrorMsg("");

        if (validatePassword()) {
            // Create a new user with email and password using firebase
            createUserWithEmailAndPassword(authentication, values.email, values.pass)
                .then(() => {
                    sendEmailVerification(authentication.currentUser)
                        .then(() => {
                            setTimeActive(true);
                            // navigate("/emailverify");
                        })
                        .catch((err) => alert(err.message));
                })
                .catch((err) => {
                    setErrorMsg(err.message);
                });
        } else {
            return;
        }

        setValues({
            username: "",
            email: "",
            pass: "",
            repass: "",
        });

        if (phone.length >= 12) {
            setUpRecaptcha();
            let appVerifier = window.recaptchaVerifier;
            signInWithPhoneNumber(authentication, phone, appVerifier)
                .then((confirmationResult) => {
                    window.confirmationResult = confirmationResult;
                    navigate("/verification");
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        if(uTypeValue == "Talent") {
            console.log("Its a talent user");
            const data = values;
            axios.post("http://localhost:5000/register/talentSignUp",{
                username: username,
        email: email,
        pass: pass,
        phone: phone,
        uType: uType
            }).then(() => {
                alert("Welcome Talent User. Your sign up data has been saved!")
            });
            console.log(data);
        } else {
            console.log("Its a seeker user");
            const data = values;
            axios.post("http://localhost:5000/register/seekerSignUp",{
                username: username,
        email: email,
        pass: pass,
        phone: phone,
        uType: uType
            }).then(() => {
                alert("Welcome Seeker User. Your sign up data has been saved!")
            });
            console.log(data);
        }

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
                    {/* Signup Form */}
                    <form onSubmit={getOtp} className="form-container" id="signup-form">
                        <img src={logo} alt="" className="form-logo w-50" />
                        <input
                            type="text"
                            placeholder="Enter Full Name"
                            className="form-control my-2"
                            label="Name"
                            onChange={(event) => {
                                setValues((prev) => ({ ...prev, username: event.target.value }));
                            }}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="form-control my-2"
                            label="Email"
                            onChange={(event) => {
                                setValues((prev) => ({ ...prev, email: event.target.value }));
                            }}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="form-control my-2"
                            label="Password"
                            onChange={(event) => {
                                setValues((prev) => ({ ...prev, pass: event.target.value }));
                            }}
                        />
                        <input
                            type="password"
                            placeholder="Re-enter Password"
                            className="form-control my-2"
                            onChange={(event) => {
                                setValues((prev) => ({ ...prev, repass: event.target.value }));
                            }}
                        />
                        <PhoneInput
                            className="form-control"
                            placeholder="Enter phone number"
                            value={phone}
                            onChange={setPhone}
                            defaultCountry=""
                        />
                        <div style={{ position: "relative", display: "flex" }}>
                            <select className="form-control my-2" onChange={(event) => {
                                setValues((prev) => ({ ...prev, uType: event.target.value }));
                            }}>
                                <option selected>Talent</option>
                                <option >Seeker</option>
                            </select>
                            <div
                                style={{
                                    position: "absolute",
                                    right: "15px",
                                    top: "0",
                                    bottom: "0",
                                    display: "flex",
                                    alignItems: "center",
                                    color: "lightgrey",
                                }}
                            >
                                <i className="fa-solid fa-chevron-down"></i>
                            </div>
                        </div>
                        <b>{errorMsg}</b>
                        <input type="submit" className="submit-btn btn btn-lg btn-block my-2" value="Signup" />

                        <div className="alternate-option my-3 text-center">
                            Already have an account{" "}
                            <a href="login">
                                <b>
                                    <u>Login</u>
                                </b>
                            </a>
                        </div>
                    </form>
                    <div id="recaptcha-container"></div>
                </div>
            </div>
        </>
    );
};

export default Login;
