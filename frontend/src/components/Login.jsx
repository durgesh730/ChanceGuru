import { authentication } from "./firebase-config";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import React, { useState, useEffect } from "react";
import "./style.css";
import backimg from "../assets/images/godfather.png";
import logo from "../assets/images/logo1.svg";
import { useNavigate, Link } from "react-router-dom";
import { useAuthValue } from "./AuthContext";
import axios from "axios";
import server from "./server";

const Login = () => {
  const navigate = useNavigate();
  //email authentication states
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const { setTimeActive } = useAuthValue();
  const [passError, setpassError] = useState("");
  const [otpMsg, setotpMsg] = useState("");
  const [forgot, setforgot] = useState(false);
  const [reset, setreset] = useState(false);
  const [forgotValues, setforgotValues] = useState({email : "" , pass1: "", pass2: "", otp: "" });
  const [confirmObj, setconfirmObj] = useState();

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

  const handleSamepass = (e) => {
    if (forgotValues.pass1 !== e.target.value) {
      setpassError("Password do not match");
    } else {
      setpassError("");
    }
  }

  var x = document.getElementById("snackbar");
  function myFunction() {
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 15000);
  }

  const handleForgotPassword = (e) => {
    e.preventDefault();
    confirmObj.confirm(forgotValues.otp).then((result) => {
      console.log(result);
      axios
        .put(`${server}/auth/resetPassword` , {password : forgotValues.pass1 , email : forgotValues.email})
        .then((res) => {
          alert(res.data.msg);
          setforgot(false);
          setreset(false);
        })
        .catch((err)=>{
          alert(err);
        })
    }).catch((error) => {
      setpassError("Wrong OTP");
    });
  }

  const handleOtp = (e) => {
    e.preventDefault();
    console.log(forgotValues.email);
    axios
      .get(`${server}/auth/getuserwithemail/${forgotValues.email}`)
      .then((res) => {
        if(!res.data){
          alert("Email you entered is not associated with any account .")
        }else{
          setUpRecaptcha();
          let appVerifier = window.recaptchaVerifier;
          signInWithPhoneNumber(authentication, res.data.phone, appVerifier)
            .then((confirmationResult) => {
              setconfirmObj(confirmationResult);
              setotpMsg("OTP sent successfully to the registered mobile number");
              setforgot(false);
              setreset(true);
            })
            .catch((err) => {
              console.log(err);
            })
        }
      })
      .catch((err) => {
        console.log(err);
      })
      
  }

  const handleSubmission = (e) => {
    e.preventDefault();
    console.log(values.email, values.pass);
    setErrorMsg("");
    axios
      .post(`${server}/auth/login`, {
        email: values.email,
        password: values.pass,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("type", res.data.type);
        axios
          .get(`${server}/auth/`, {
            headers: {
              Authorization: `Bearer ${res.data.token}`,
            },
          })
          .then((data) => {
            // data.data.type="talent"
            data.data.token = localStorage.getItem("token");
            localStorage.setItem("login", JSON.stringify(data.data));
            if (localStorage.getItem("type") == "seeker" || localStorage.getItem("type") == "admin") {
              navigate("/seekerdashboard");
            } else if (localStorage.getItem("type") == "user") {
              navigate("/talentdashboard");
              myFunction();
            }
          })
          .catch((err) => {

            console.log(err);
          });
      })
      // .then((res) => {
      //   if (res.status == 200) {
      //     signInWithEmailAndPassword(authentication, values.email, values.pass)
      //       .then(() => {
      //         if (!authentication.currentUser.emailVerified) {
      //           alert("Email not verified");
      //         } else {
      //           localStorage.setItem("token", res.data.token);
      //           localStorage.setItem("type", res.data.type);
      //           axios
      //             .get(`${server}/auth/` , {
      //               headers: {
      //                 Authorization: `Bearer ${res.data.token}`,
      //               },
      //             })
      //             .then((data) => {
      //               // data.data.type="talent"
      //               data.data.token = localStorage.getItem("token");
      //               localStorage.setItem("login", JSON.stringify(data.data));
      //               if (localStorage.getItem("type") == "seeker" || localStorage.getItem("type") == "admin") {
      //                 navigate("/seekerdashboard");
      //               } else if (localStorage.getItem("type") == "user") {
      //                 navigate("/talentdashboard");
      //               }
      //             })
      //             .catch((err) => {
      //               console.log(err);
      //             });
      //         }
      //       })
      //       .catch((err) => setErrorMsg(err.message));

      //   }
      // })
      .catch((err) => {
        setErrorMsg("Invalid email or password");
        console.log(err);
      });
  };

  useEffect(() => {
    let user = localStorage.getItem("login");
    if (localStorage.getItem("login")) {
      if (user.type == "seeker" || user.type == "admin") {
        navigate("/seekerdashboard");
      } else if (user.type == "user") {
        navigate("/talentdashboard");
      }
    }
  }, []);

  return (
    <>

      <div id="snackbar">You are logged in Successfully..</div>

      <div className="login-container row">
        <div className="left-side col-lg-5">
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
        <div className="right-side col-lg-7 d-flex align-items-center justify-content-center">
          <form
            onSubmit={handleSubmission}
            action=""
            className={`form-container ${forgot || reset ? "d-none" : ""}`}
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
                setErrorMsg("");
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
              <u onClick={() => { setforgot(true); }}>Forgot Password?</u> <br />
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
          <form onSubmit={(e) => { handleOtp(e) }} action="" className={`form-container ${forgot ? "" : "d-none"}`} >
            <img src={logo} alt="" className="form-logo" />
            <b>OTP will be sent to your registered mobile number</b>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control my-2"
              required
              onChange={(event) => {
                setforgotValues((prev) => ({ ...prev, email: event.target.value }));
              }}
            />
            <button
              type="submit"
              className="submit-btn btn btn-lg btn-block my-4"
            >
              Send OTP
            </button>
            <div id="recaptcha-container"></div>
          </form>
          <form onSubmit={(e) => { handleForgotPassword(e) }} action="" className={`form-container ${reset ? "" : "d-none"}`} >
            <img src={logo} alt="" className="form-logo" />
            {otpMsg}
            <input
              className="form-control my-2"
              placeholder="Enter OTP"
              type="text"
              maxLength="6"
              pattern="[0-9]*"
              autocomplete="off"
              required
              onChange={(event) => {
                setforgotValues((prev) => ({ ...prev, otp : event.target.value }));
              }}
            />
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control my-2"
              required
              onChange={(event) => {
                setforgotValues((prev) => ({ ...prev, pass1: event.target.value }));
              }}
            />
            <input
              type="password"
              placeholder="Re-Enter Password"
              className="form-control my-2"
              required
              onChange={(event) => {
                setforgotValues((prev) => ({ ...prev, pass2: event.target.value })); handleSamepass(event);
              }}
            />
            <b>{passError}</b>
            <button
              type="submit"
              className="submit-btn btn btn-lg btn-block my-4"
            >
              Reset Password
            </button>
          </form>
        </div>


      </div>
    </>
  );
};

export default Login;
