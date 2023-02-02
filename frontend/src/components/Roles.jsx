import React from "react";
import Topbar from "./mini_components/Topbar";
import annouce from "../assets/icons/noun-announce-4868354.svg";
import { useState } from "react";

const Roles = ({ display }) => {
  const [projectDetails, setProjectDetails] = useState({
    date: "11/12/2018",
    location: "New Jersey",
    projectName: "Shakespeare's Macbeth",
    roleCount: "04",
    charCount: "06",
  });

  const [rolesDetails, setRolesDetails] = useState({
    leadNegative: "Voldemort",
    lead: "Harry",
    supportingActor: "Ron",
    chorusEnsemble: "Snape",
  });

  const changeHandler = (e) => {
    setProjectDetails({ ...projectDetails, [e.target.name]: e.target.value });
  };
  const changeRoleHandler = (e) => {
    setRolesDetails({ ...rolesDetails, [e.target.name]: e.target.value });
  };

  let rolesForm = document.getElementById("roles-form");
  let charForm = document.getElementById("char-form");
  let summForm = document.getElementById("summ-form");
  let rolesToggle = document.getElementById("roles-toggle");
  let charToggle = document.getElementById("char-toggle");
  let summToggle = document.getElementById("summ-toggle");

  const toggle = (cur_form) => {
    if (cur_form == "roles") {
      rolesForm.style.display = "block";
      charForm.style.display = "none";
      summForm.style.display = "none";
      rolesToggle.classList.add("active-toggle");
      charToggle.classList.remove("active-toggle");
      summToggle.classList.remove("active-toggle");

    } else {
      charForm.style.display = "block";
      rolesForm.style.display = "none";
      summForm.style.display = "none";
      rolesToggle.classList.remove("active-toggle");
      charToggle.classList.add("active-toggle");
      summToggle.classList.remove("active-toggle");

    }
    // else {
    //   summForm.style.display = "block";
    //   charForm.style.display = "none";
    //   rolesForm.style.display = "none";
    //   summToggle.classList.add("active-toggle");
    //   charToggle.classList.remove("active-toggle");
    //   rolesToggle.classList.remove("active-toggle");
    //   cur_form = "";
    // }
  };

  let show = {};
  if (display) {
    show = { display: "block" };
  } else {
    show = { display: "none" };
  }

  return (
    <div className="roleCreation ">
      <Topbar />
      <div className="flex-container">
        <div className="roleDetails">
          <div className="row">
            <div className="col-lg-3">
              <img className="announcesvg" src={annouce} alt="" />
            </div>
            <div className="col-lg-9">
              <span class="project-name">{projectDetails.projectName}</span>{" "}
              <br />
              <span class="project-desc">
                Casting "Macbeth" by William Shakespeare. Set in 11th century
                Scotland.
              </span>
            </div>
          </div>

          <hr className="hr1" />
          <div className="posted">
            <span className="date">Posted On</span>
            <span class="date-value">{projectDetails.date}</span>
            <span class="Location">Location</span>
            <span class="location-value">{projectDetails.location}</span>
          </div>

          <div className="count">
            <span class="role">Roles</span>
            <span class="characters">Characters</span>
            <br />
            <span class="role-count">{projectDetails.roleCount}</span>
            <span class="character-count">{projectDetails.charCount}</span>
          </div>
        </div>
        <>
          {" "}
          {
            <div className="roleUpdate form-body">
              <div
                className="form-toggle d-flex justify-content-between"
                style={show}
              >
                <div
                  className="toggle-option active-toggle"
                  onClick={() => {
                    toggle("roles");
                  }}
                  id="roles-toggle"
                >
                  Roles
                </div>
                <div
                  className="toggle-option"
                  onClick={() => {
                    toggle("char");
                  }}
                  id="char-toggle"
                >
                  Characters
                </div>
                <div
                  className="toggle-option"
                  onClick={() => {
                    toggle("summary");
                  }}
                  id="summ-toggle"
                >
                  Summary
                </div>
              </div>

          
              <div className="form-container ">

                <form id="roles-form">
                  <input
                    type="submit"
                    className="full-width-btn"
                    value="Add Roles"
                  />
                  <select
                    className="form-control form-select"
                    id="exampleFormControlSelect1"
                  >
                    <option value="" disabled selected>
                      Lead Negative Role
                    </option>
                    <option value="villain">{rolesDetails.leadNegative}</option>
                  </select>
                  <select
                    className="form-control form-select"
                    id="exampleFormControlSelect1"
                  >
                    <option value="" disabled selected>
                      Lead
                    </option>
                    <option value="lead">{rolesDetails.lead}</option>
                  </select>
                  <select
                    className="form-control form-select"
                    id="exampleFormControlSelect1"
                  >
                    <option value="spporting actor" disabled selected>
                      Supporting Actor
                    </option>
                    <option value="lead">{rolesDetails.supportingActor}</option>
                  </select>
                  <select
                    className="form-control form-select"
                    id="exampleFormControlSelect1"
                  >
                    <option value="chorus" disabled selected>
                      Chorus/Ensemble
                    </option>
                    <option value="lead">{rolesDetails.chorusEnsemble}</option>
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
                      onClick={changeRoleHandler}
                    />
                  </div>
                </form>
                <form id="char-form" style={{ display: "none" }}>
    <div className="charList row">
             
                <div
                  className="col-lg-3  btn btn-sm btn-block my-2"
                  onClick={() => {
                    toggle("");
                  }}
                  id=""
                >
                  Lead Negative Role
                </div>
                <div
                  className="col-lg-3  btn btn-sm btn-block my-2 "
                  onClick={() => {
                    toggle("");
                  }}
                  id=""
                >
                  Lead
                </div>
                <div
                  className="col-lg-3  btn btn-sm btn-block my-2"
                  onClick={() => {
                    toggle("");
                  }}
                  id=""
                >
                  Supporting Actor
                </div>
                <div
                  className="col-lg-3  btn btn-sm btn-block my-2"
                  onClick={() => {
                    toggle("");
                  }}
                  id=""
                >
                  Chorus/Ensemble
                </div>
              </div>
                  <div className="d-flex">
                    <p className="mx-1"></p>
                    <input
                      type="submit"
                      className="full-width-btn"
                      value="Add Another Character"
                    />
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Character Name"
                  />
                  <select
                    className="form-control form-select"
                    id="exampleFormControlSelect1"
                  >
                    <option value="chorus" disabled selected>
                      Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="male">Female</option>
                  </select>
                  <textarea
                    name=""
                    id=""
                    className="form-control text-area"
                    rows="5"
                    placeholder="Details..."
                    maxlength="250"
                  ></textarea>
                  <select
                    className="form-control form-select"
                    id="exampleFormControlSelect1"
                  >
                    <option value="" disabled selected>
                      Age
                    </option>
                    <option value="male">19</option>
                    <option value="female">20</option>
                    <option value="female">21</option>
                    <option value="female">22</option>
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
                <div className="summary" style={{ display: "none" }}>
                  Summary render
                </div>
              </div>
            </div>
          }{" "}
        </>
      </div>
    </div>
  );
};

export default Roles;
