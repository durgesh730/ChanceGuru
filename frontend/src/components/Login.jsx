import { authentication } from "./firebase-config";
import { signInWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import React , { useState , useEffect } from "react";
import "./style.css";
import backimg from "../assets/images/godfather.png";
import logo from "../assets/images/logo1.svg";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "./AuthContext";
import axios from 'axios';


const Login = () => {
    const navigate = useNavigate();
    //email authentication states
    const [values, setValues] = useState({
        email: "",
        pass: "",
    });
    const [errorMsg, setErrorMsg] = useState("");
    const { setTimeActive } = useAuthValue();

    const handleSubmission = (e) => {
        e.preventDefault();
        setErrorMsg("");
        axios
            .get("http://localhost:5000/getuser", { email: values.email })
            .then((res) => {
                if (res.status == 201) {
                    signInWithEmailAndPassword(authentication, values.email, values.pass)
                        .then(() => {
                            if (!authentication.currentUser.emailVerified) {
                                //     sendEmailVerification(authentication.currentUser)
                                //     .then(() => {
                                //       setTimeActive(true)
                                //       navigate('/verify-email')
                                //     })
                                //   .catch(err => alert(err.message))
                                alert("Email not verified");
                                // navigate('/emailverify')
                            } else {
                                navigate("/talentdashboard");
                            }
                        })
                        .catch((err) => setErrorMsg(err.message));

                    localStorage.setItem("login" , JSON.stringify(res.data[0]))
                }
            })
            .catch((err) => {
                console.log(err);
            })

    };
    
    useEffect(() => {
      if(localStorage.getItem("login")){
        navigate("/talentdashboard");
      }
    }, [])
    
    return (
        <>
            <div className="login-container row">
                <div className="left-side col-5">
                    <div className="top-left d-flex align-items-center">
                        <i className="bi bi-arrow-left"></i>
                        <p className="px-3 m-0">Login</p>
                    </div>
                    <img className="login-img" src={backimg} alt="" />
                    <div className="login-footer">
                        <div className="open-quote">“</div>
                        <div className="quote">
                            Acting is the least mysterious of all crafts. Whenever we want something from somebody or
                            when we want to hide something or pretend, we're acting. Most people do it all day long.
                        </div>
                        <div className="author">marlon brando</div>
                        <div className="close-quote">”</div>
                        <div className="three-dots">
                            <i className="fa-solid fa-circle mx-1"></i>
                            <i className="fa-regular fa-circle mx-1"></i>
                            <i className="fa-regular fa-circle mx-1"></i>
                        </div>
                    </div>
                </div>
                <div className="right-side col-7 d-flex align-items-center justify-content-center">
                    <form onSubmit={handleSubmission} action="" className="form-container">
                        <img src={logo} alt="" className="form-logo" />
                        <input
                            type="email"
                            placeholder="Email"
                            className="form-control my-2"
                            required
                            onChange={(event) => {
                                setValues((prev) => ({ ...prev, email: event.target.value }));
                            }}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="form-control my-2"
                            required
                            onChange={(event) => {
                                setValues((prev) => ({ ...prev, pass: event.target.value }));
                            }}
                        />
                        <b>{errorMsg}</b>
                        {/* alert({errorMsg}) */}
                        <button type="submit" className="submit-btn btn btn-lg btn-block my-4">
                            Login
                        </button>
                        <div className="alternate-option text-center">
                            Don’t have an account{" "}
                            <a href="/signup">
                                <b>
                                    <u>Signup</u>
                                </b>
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
