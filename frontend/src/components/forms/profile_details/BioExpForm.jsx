import React from "react";
import { useState , useEffect } from "react";
import axios from "axios";

const BioExpForm = ({ display , toggleForm , profileData }) => {
    let bioForm = document.getElementById("bio-form");
    let expForm = document.getElementById("exp-form");
    let bioToggle = document.getElementById("bio-toggle");
    let expToggle = document.getElementById("exp-toggle");

    const toggle = (cur_form) => {
        if (cur_form == "bio") {
            bioForm.style.display = "block";
            expForm.style.display = "none";
            bioToggle.classList.add("active-toggle");
            expToggle.classList.remove("active-toggle");
        } else {
            expForm.style.display = "block";
            bioForm.style.display = "none";
            bioToggle.classList.remove("active-toggle");
            expToggle.classList.add("active-toggle");
        }
    };

    let show = {};
    if (display) {
        show = { display: "block" };
    } else {
        show = { display: "none" };
    }

    const [bioData, setBioData] = useState({
        bio: "",
    });

    const [expData, setExpData] = useState({
        workedIn: "",
        workedAs: "",
        startDate: "",
        endDate: "",
        aboutWork: "",
    })

    const {
        bio
    } = bioData;

    const {
        workedIn,
        workedAs,
        startDate,
        endDate,
        aboutWork,
        userId2
    } = expData;

    const handleBioInputChange = (e) => {
        setBioData({ ...bioData, [e.target.name]: e.target.value });
    };

    const handleExpInputChange = (e) => {
        setExpData({ ...expData, [e.target.name]: e.target.value });
    };

    const handleBioSubmit = (e) => {
        console.log('hii')
        e.preventDefault();
        const data = bioData;
        axios.put('http://localhost:5000/profile/portfolio', { bio: bio }, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        },
        ).then((res) => {
            alert("Bio Details data saved!")
            console.log("data added");
            console.log(res);
            toggle("exp");
        })
        console.log(data);
    }


    const handleExpSubmit = (e) => {
        e.preventDefault();
        const data = expData;
        axios.put('http://localhost:5000/profile/portfolio/exp', {
            workedIn,
            workedAs,
            startDate,
            endDate,
            aboutWork,
            userId2
        },

            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }

        ).then((res) => {
            alert("Experience Details data saved!")
            console.log("data added");
            console.log(res);
            if(res){
                toggleForm("photo");
            }
        })
        console.log(data);
    }

    useEffect(() => {
        if(profileData.portfolio){
            setBioData({bio : profileData.portfolio.bio});
            console.log(profileData.portfolio.experience[0]);
            setExpData(profileData.portfolio.experience[0]);
        }
    }, [])
    
    return (
        <>
            {
                <div className="form-body" style={show}>
                    <div className="form-container">
                        <div className="form-head">Portfolio</div>
                        <div className="form-desc">Let us know about you to suggest the best for you.</div>
                        <div className="form-toggle d-flex justify-content-between  ">
                            <div
                                className="toggle-option active-toggle"
                                onClick={() => {
                                    toggle("bio");
                                }}
                                id="bio-toggle"
                            >
                                Bio
                            </div>
                            <div
                                className="toggle-option"
                                onClick={() => {
                                    toggle("exp");
                                }}
                                id="exp-toggle"
                            >
                                Experience
                            </div>
                        </div>
                        <form id="bio-form" onSubmit={(e) => { handleBioSubmit(e) }} >
                            <textarea
                                name="bio"
                                value={bioData.bio}
                                onChange={handleBioInputChange}
                                id="bio"
                                className="form-control text-area"
                                rows="8"
                                placeholder="Write about yourself"
                                maxLength="250"
                            ></textarea>
                            <label htmlFor="bio" className="mx-3 small-text">
                                Minimum 256 characters
                            </label>
                            <div className="row">
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
                        <form id="exp-form" style={{ display: "none" }} onSubmit={handleExpSubmit}>
                            <input type="submit" className="full-width-btn" value="Add Experience" />
                            <input name="workedIn"
                                value={bioData.workedIn}
                                onChange={handleExpInputChange} type="text" className="form-control" placeholder="Worked in" />
                            <input name="workedAs"
                                value={bioData.workedAs}
                                onChange={handleExpInputChange} type="text" className="form-control" placeholder="Worked as" />
                            <input name="startDate"
                                value={bioData.startDate}
                                onChange={handleExpInputChange} type="text" className="form-control" placeholder="Start date" />
                            <input name="endDate"
                                value={bioData.endDate}
                                onChange={handleExpInputChange} type="text" className="form-control" placeholder="End date" />
                            <textarea
                                name="aboutWork"
                                value={bioData.aboutWork}
                                onChange={handleExpInputChange}
                                id="bio"
                                className="form-control text-area"
                                rows="5"
                                placeholder="About Work"
                                maxLength="250"
                            ></textarea>
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

export default BioExpForm;
