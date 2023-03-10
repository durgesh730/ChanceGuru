import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import server from "../../server";

const EduSkillForm = ({ display, toggleForm }) => {
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
    college: "",
    degree: "",
    startYear: "",
    endYear: "",
  });

  const [skills, setskills] = useState([{ skill: "" }]);

  const handleSkillChange = (e, index) => {
    let data = [...skills];
    data[index].skill = e.target.value;
    setskills(data);
  };

  const addFields = (e) => {
    e.preventDefault();
    let obj = { skill: "" };
    setskills([...skills, obj]);
  };

  const removeFields = (index) => {
    let data = [...skills];
    data.splice(index, 1);
    setskills(data);
  };

  const handleInputChange = (e) => {
    setEduSkillDetails({ ...eduSkillDetails, [e.target.name]: e.target.value });
  };
  const handleEduSubmit = (e) => {
    e.preventDefault();
    const data = eduSkillDetails;
    axios
      .put(`${server}/profile/education`, eduSkillDetails, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        alert("Eudcation details saved!");
        console.log("data added");
        toggle("tog2");
      });
    console.log(data);
  };

  const handleSkillsSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `${server}/profile/skills`,
        { skills },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        alert("Skills Details saved!");
        console.log("data added");
        console.log(res);
        if (res) {
          toggleForm("role");
        }
      });
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
          console.log(response.data);
          if (response.data.education.length !== 0) {
            setEduSkillDetails(response.data.education[0]);
          }
          if (response.data.skills.length !== 0) {
            setskills(response.data.skills);
          }
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  useEffect(() => {
    handleShow();
  }, []);

  return (
    <>
      {
        <div className="form-body" style={show}>
          <div className="form-container">
            <div className="form-head">Education & Skills</div>
            <div className="form-desc">
              Let us know about you to suggest the best for you.
            </div>
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
                name="course"
                onChange={handleInputChange}
                value={eduSkillDetails.degree}
                className="form-control form-select"
              >
                <option value="" disabled selected>
                  Degree
                </option>
                <option>Engineeting</option>
                <option>Pharmacy</option>
              </select>
              <select
                name="schoolYear"
                onChange={handleInputChange}
                value={eduSkillDetails.startYear}
                className="form-control form-select"
              >
                <option value="" disabled selected>
                  Start Year
                </option>
                <option>2017</option>
                <option>2018</option>
                <option>2019</option>
                <option>2020</option>
              </select>

              <select
                name="collegeYear"
                onChange={handleInputChange}
                value={eduSkillDetails.endYear}
                className="form-control form-select"
              >
                <option value="" disabled selected>
                  End Year
                </option>
                <option>2019</option>
                <option>2020</option>
                <option>2021</option>
                <option>2022</option>
              </select>
              <div className="d-flex justify-content-between mt-5">
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
            <form
              id="form2"
              style={{ display: "none" }}
              onSubmit={handleSkillsSubmit}
            >
              <button className="full-width-btn" onClick={addFields}>
                Add Skills
              </button>
              {skills.map((item, index) => {
                return (
                  <>
                    <div key={index} className="d-flex align-items-center">
                      <select
                        name="addSkills"
                        onChange={(e) => {
                          handleSkillChange(e, index);
                        }}
                        value={item.skill}
                        className="form-control form-select"
                      >
                        <option value="" disabled selected>
                          Add Skill
                        </option>
                        <option>Singing</option>
                        <option>Acting</option>
                      </select>
                      <i
                        className="fa-solid fa-trash-can mx-2 mb-2"
                        onClick={() => removeFields(index)}
                      ></i>
                    </div>
                  </>
                );
              })}
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
          </div>
        </div>
      }
    </>
  );
};

export default EduSkillForm;
