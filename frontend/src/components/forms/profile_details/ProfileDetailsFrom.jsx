import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

import "../forms.css";
import { useState } from "react";
import { useEffect } from "react";
import server from "../../server";

const ProfileDetailsForm = ({
  display,
  toggle,
  profileData,
  bool,
  setbool,
  userData
}) => {
  const user = JSON.parse(localStorage.getItem("login"));
  let show = {};
  if (display) {
    show = { display: "block" };
  } else {
    show = { display: "none" };
  }

  const [profileDetails, setProfileDetails] = useState({
    fullname: "",
    gender: "",
    email: "",
    password: "",
    DOB: "",
    city: "",
    state: "",
    country: "",
    address: "",
    linkedin: "",
    facebook: "",
    instagram: "",
    userId: "1",
  });



  const handleInputChange = (e) => {
    setProfileDetails({ ...profileDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      fullname,
      gender,
      email,
      password,
      DOB,
      city,
      state,
      country,
      address,
      linkedin,
      facebook,
      instagram,
      userId,
    } = profileDetails;

    if (bool) {
      const res = await fetch(`${server}/profile/basicinfo`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          fullname,
          gender,
          email,
          password,
          DOB,
          city,
          state,
          country,
          address,
          linkedin,
          facebook,
          instagram,
          userId,
        }),
      });
      const ok = await res.json();
      if (ok) {
        alert("Profile details updated successfully");
        toggle("talent");
      }
    } else {
      const res = await fetch(`${server}/profile/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          fullname,
          gender,
          email,
          password,
          DOB,
          city,
          state,
          country,
          address,
          linkedin,
          facebook,
          instagram,
          userId,
        }),
      });
      const ok = await res.json();
      if (ok) {
        alert("Profile details saved successfully");
        toggle("talent");
      }
    }
  };

  const handleShow = async () => {
    axios
      .get(`${server}/profile/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (response.data !== null) {
            setProfileDetails(response.data.basicInfo);
          setbool(true);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    if(user.type === "user"){
      handleShow();
    }else{
      setProfileDetails(userData?.basicInfo);
    }
  }, [setProfileDetails]);

  return (
    <>
      {
        <div className="form-body" style={show}>
          <ToastContainer position="top-center" />
          <div className="form-container">
            <div className="form-head">Portfolio Details</div>
            <div className="form-desc">
              Let us know about you to suggest the best for you.
            </div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                name="fullname"
                value={profileDetails.fullname}
                required
                onChange={handleInputChange}
              />
              <div style={{ position: "relative", display: "flex" }}>
                <select
                  name="gender"
                  onChange={handleInputChange}
                  value={profileDetails.gender}
                  className="form-control form-select"
                  required
                >
                  <option value="" disabled selected>
                    Gender
                  </option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
              <input
                type="date"
                className="form-control empty"
                placeholder="Date of birth"
                name="DOB"
                value={profileDetails.DOB}
                onChange={handleInputChange}
                required
              />
              <div style={{ position: "relative", display: "flex" }}>
                <select
                  name="city"
                  onChange={handleInputChange}
                  value={profileDetails.city}
                  className="form-control form-select"
                >
                  <option value="" disabled selected>
                    City
                  </option>
                  <option>Pune</option>
                  <option>Mumbai</option>
                </select>
                <p className="mx-2"></p>
                <select
                  name="state"
                  onChange={handleInputChange}
                  value={profileDetails.state}
                  className="form-control form-select"
                  required
                >
                  <option value="" disabled selected>
                    State
                  </option>
                  <option>Maharashtra</option>
                  <option>Goa</option>
                </select>
              </div>
              <select
                name="country"
                onChange={handleInputChange}
                value={profileDetails.country}
                className="form-control form-select"
                required
              >
                <option value="" disabled selected>
                  Country
                </option>
                <option>India</option>
                <option>USA</option>
              </select>
              <input
                type="text"
                className="form-control"
                placeholder="Address"
                name="address"
                value={profileDetails.address}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                className="form-control"
                placeholder="Linkedin"
                name="linkedin"
                value={profileDetails.linkedin}
                onChange={handleInputChange}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Facebook"
                name="facebook"
                value={profileDetails.facebook}
                onChange={handleInputChange}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Instagram"
                name="instagram"
                value={profileDetails.instagram}
                onChange={handleInputChange}
              />
              <div className="d-flex justify-content-between mt-5">
                <input
                  type="button"
                  className="col-4 cancel-btn btn btn-lg btn-block my-2"
                  value="Cancel"
                />
                <p className="col-1"></p>
                <input
                  type="submit"
                  className="col-7 save-btn btn btn-lg btn-block my-2"
                  value="Save"
                />
              </div>
            </form>
          </div>
        </div>
      }
    </>
  );
};

export default ProfileDetailsForm;
