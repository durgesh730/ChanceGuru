import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

import "../forms.css";
import { useState } from "react";

const ProfileDetailsForm = ({ display }) => {
    const user = JSON.parse(localStorage.getItem("login"));
    let show = {};
    if (display) {
        show = { display: "block" };
    } else {
        show = { display: "none" };
    }

    const [profileDetails, setProfileDetails] = useState({
        full_name: "",
        gender: "",
        email: "",
        password: "",
        DOB: "",
        city: "",
        State: "",
        country: "",
        address: "",
        linkedin: "",
        facebook: "",
        instagram: "",
        userId:"1"
    });
    const { full_name, gender, email, password, DOB, city, State, country, address, linkedin, facebook, instagram, userId } =
        profileDetails;

    // const history = useNavigate();

    const handleInputChange = (e) => {
        // console.log(profileDetails);
        setProfileDetails({ ...profileDetails, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = profileDetails;
        axios
            .post("http://localhost:5000/profiles", {
                full_name: full_name,
                gender: gender,
                email: email,
                password: password,
                DOB: DOB,
                city: city,
                State: State,
                country: country,
                address: address,
                linkedin: linkedin,
                facebook: facebook,
                instagram: instagram,
                userId:userId
            })
            .then(() => {
                alert("Profile data saved!");
                console.log("data added");
            });
        console.log(data);
    };

    return (
        <>
            {
                <div className="form-body" style={show}>
                    <ToastContainer position="top-center" />
                    <div className="form-container">
                        <div className="form-head">Portfolio Details</div>
                        <div className="form-desc">Let us know about you to suggest the best for you.</div>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Full Name"
                                name="full_name"
                                value={profileDetails.full_name}
                                onChange={handleInputChange}
                            />
                            <div style={{ position: "relative", display: "flex" }}>
                                <select
                                    name="gender"
                                    onChange={handleInputChange}
                                    value={profileDetails.gender}
                                    className="form-control form-select"
                                >
                                    <option value="" disabled selected>
                                        Gender
                                    </option>
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>
                            </div>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Email"
                                name="email"
                                value={profileDetails.email}
                                onChange={handleInputChange}
                            />
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name="password"
                                value={profileDetails.password}
                                onChange={handleInputChange}
                            />
                            <input
                                type="date"
                                className="form-control empty"
                                placeholder="Date of birth"
                                name="DOB"
                                value={profileDetails.DOB}
                                onChange={handleInputChange}
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
                                    name="State"
                                    onChange={handleInputChange}
                                    value={profileDetails.State}
                                    className="form-control form-select"
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
                                value={country}
                                className="form-control form-select"
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
                            <div className="row">
                                <input
                                    type="submit"
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
