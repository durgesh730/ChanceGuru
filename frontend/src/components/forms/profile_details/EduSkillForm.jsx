import React from "react";
import { useState } from "react";
import axios from "axios";

const EduSkillForm = ({ display }) => {
    let form1 = document.getElementById("form1");
    let form2 = document.getElementById("form2");
    let toggle1 = document.getElementById("toggle1");
    let toggle2 = document.getElementById("toggle2");

    const toggle = (cur_form) => {
        if (cur_form == "tog1") {
            form1.style.display = "block";
            form2.style.display = "none";
            toggle1.classList.add("active-toggle");
            toggle2.classList.remove("active-toggle");
        } else {
            form2.style.display = "block";
            form1.style.display = "none";
            toggle1.classList.remove("active-toggle");
            toggle2.classList.add("active-toggle");
        }
    };

    let show = {};
    if (display) {
        show = { display: "block" };
    } else {
        show = { display: "none" };
    }


    const [eduSkillDetails, setEduSkillDetails] = useState({
        school: "",
        schoolYear: "",
        course: "",
        college: "",
        collegeYear: "",
        addSkills: "",
        userId: "1"
    });

    const { school, schoolYear, course, college, collegeYear, addSkills, userId } = eduSkillDetails;

    const handleInputChange = (e) => {
        setEduSkillDetails({ ...eduSkillDetails, [e.target.name]: e.target.value });
    };
    const handleEduSubmit = (e) => {
        e.preventDefault();
        const data = eduSkillDetails;
        axios.put('/profile/education', {
            school: school,
            schoolYear: schoolYear,
            course: course,
            college: college,
            collegeYear: collegeYear,
            userId: userId

        },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }

        ).then(() => {
            alert("Eudcation details saved!")
            console.log("data added")
        });
        console.log(data);

    };

    const handleSkillsSubmit = (e) => {
        e.preventDefault();
        const data = eduSkillDetails;
        axios.put('/profile/skills', {
            userId: userId,
            addSkills: addSkills,
        },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }

        ).then((res) => {
            alert("Skills Details saved!")
            console.log("data added")
            console.log(res)
        })
        console.log(addSkills);
    }
    return (
        <>
            {
                <div className="form-body" style={show}>
                    <div className="form-container">
                        <div className="form-head">Education & Skills</div>
                        <div className="form-desc">Let us know about you to suggest the best for you.</div>
                        <div className="form-toggle d-flex justify-content-between  ">
                            <div
                                className="toggle-option active-toggle"
                                onClick={() => {
                                    toggle("tog1");
                                }}
                                id="toggle1"
                            >
                                Education
                            </div>
                            <div
                                className="toggle-option"
                                onClick={() => {
                                    toggle("tog2");
                                }}
                                id="toggle2"
                            >
                                Skill
                            </div>
                        </div>
                        <form id="form1" onSubmit={handleEduSubmit}>
                            <input
                                name="school"
                                onChange={handleInputChange}
                                value={eduSkillDetails.school}
                                type="text"
                                className="form-control"
                                placeholder="School"
                            />
                            {/* <input type="month" className="form-control" /> */}
                            <select
                                name="schoolYear"
                                onChange={handleInputChange}
                                value={eduSkillDetails.schoolYear}
                                className="form-control form-select"
                            >
                                <option value="" disabled selected>
                                    Year
                                </option>
                                <option>2017</option>
                                <option>2018</option>
                                <option>2019</option>
                                <option>2020</option>
                            </select>
                            <select
                                name="course"
                                onChange={handleInputChange}
                                value={eduSkillDetails.course}
                                className="form-control form-select"
                            >
                                <option value="" disabled selected>
                                    Course
                                </option>
                                <option>Engineeting</option>
                                <option>Pharmacy</option>
                            </select>
                            <select
                                name="college"
                                onChange={handleInputChange}
                                value={eduSkillDetails.college}
                                className="form-control form-select"
                            >
                                <option value="" disabled selected>
                                    College
                                </option>
                                <option>AISSMS</option>
                                <option>IIT</option>
                                <option>PICT</option>
                                <option>COEP</option>
                            </select>
                            <select
                                name="collegeYear"
                                onChange={handleInputChange}
                                value={eduSkillDetails.collegeYear}
                                className="form-control form-select"
                            >
                                <option value="" disabled selected>
                                    Year
                                </option>
                                <option>2019</option>
                                <option>2020</option>
                                <option>2021</option>
                                <option>2022</option>
                            </select>
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
                        <form id="form2" style={{ display: "none" }} onSubmit={handleSkillsSubmit}>
                            <select
                                name="addSkills"
                                onChange={handleInputChange}
                                value={eduSkillDetails.addSkills}
                                className="form-control form-select"
                            >
                                <option value="" disabled selected>
                                    Add Skill
                                </option>
                                <option>Singing</option>
                                <option>Acting</option>
                            </select>
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

export default EduSkillForm;
