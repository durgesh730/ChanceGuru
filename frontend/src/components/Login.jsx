import { authentication } from "./firebase-config";
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import React, { useState, useEffect } from "react";
import "./style.css";
import backimg from "../assets/images/godfather.png";
import logo from "../assets/images/logo1.svg";
import { useNavigate, Link } from "react-router-dom";
import { useAuthValue } from "./AuthContext";
import axios from "axios";

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
    console.log(values.email, values.pass);
    setErrorMsg("");
    axios
      .post("http://localhost:5000/auth/login", {
        email: values.email,
        password: values.pass,
      })
      .then((res) => {
        if (res.status == 200) {
          signInWithEmailAndPassword(authentication, values.email, values.pass)
            .then(() => {
              if (!authentication.currentUser.emailVerified) {
                alert("Email not verified");
              } else {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("type", res.data.type);
                axios
                  .get("http://localhost:5000/auth/", {
                    headers: {
                      Authorization: `Bearer ${res.data.token}`,
                    },
                  })
                  .then((data) => {
                    // data.data.type="talent"
                    data.data.token = localStorage.getItem("token");
                    localStorage.setItem("login", JSON.stringify(data.data));
                    if (localStorage.getItem("type") == "seeker") {
                      navigate("/seekerdashboard");
                    } else if (localStorage.getItem("type") == "user") {
                      navigate("/talentdashboard");
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            })
            .catch((err) => setErrorMsg(err.message));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    let user = localStorage.getItem("login");
    if (localStorage.getItem("login")) {
      if (user.type == "seeker") {
        navigate("/seekerdashboard");
      } else if (user.type == "user") {
        navigate("/talentdashboard");
      }
    }
  }, []);

  return (
    <>
      <div className="login-container row">
        <div className="left-side col-5">
          <div className="top-left d-flex align-items-center">
            <i
              onClick={() => {
                navigate("/");
              }}
              className="bi bi-arrow-left"
            ></i>
            <p className="px-3 m-0">Login</p>
          </div>
          <img className="login-img" src={backimg} alt="" />
          <div className="login-footer">
            <div className="open-quote">“</div>
            <div className="quote">
              Acting is the least mysterious of all crafts. Whenever we want
              something from somebody or when we want to hide something or
              pretend, we're acting. Most people do it all day long.
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
          <form
            onSubmit={handleSubmission}
            action=""
            className="form-container"
          >
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
            <button
              type="submit"
              className="submit-btn btn btn-lg btn-block my-4"
            >
              Login
            </button>
            <div className="alternate-option text-center">
              Don’t have an account{" "}
              <div className="web1-buttons d-flex flex-column mt-3">
                <Link to="/signup" state={{ talent: true }}>
                  <button className="btn btn-talents">
                    Sign up as Talents
                  </button>
                </Link>
                <Link to="/signup" state={{ talent: false }}>
                  <button className="btn btn-seekers">
                    Sign up as Seekers
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
