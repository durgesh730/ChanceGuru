import React, { useEffect } from "react";
import Topbar from "./mini_components/Topbar";
import annouce from "../assets/icons/noun-announce-4868354.svg";
import { useState } from "react";
import { useLocation } from "react-router-dom";


const Roles = ({ display }) => {

  const location = useLocation();
  const [projectDetails, setProjectDetails] = useState();

  // const [getData, setGetData] = useState({ option: "" })
  // console.log(getData)

  const handlechange = (e) => {
    console.log(e.target.value)
  }

  const ProjectData = async () => {
    const data = await fetch(`http://localhost:5000/project/projectDetails/${location.state}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const res = await data.json();
    setProjectDetails(res)
  }

  var char = 0;
  var all = new Array();
  var a = 0;

  {
    projectDetails?.map((items, i) => items.roles.map((i) => {
      char = char + i.characters.length;
      var length = i.characters.length;
      for (i = 0; i < length; i++) {
        all[i] = char
      }

      for (i = 0; i < all.length; i++) {
        if (all[i] > a)
          a = all[i]
      }
    })
    )
  }


  useEffect(() => {
    ProjectData()
  }, [setProjectDetails])

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

              {
                projectDetails?.map((item) => {

                  return (
                    <>
                      <span class="project-name">{item.basicInfo.name}</span>{" "}
                      <br />
                      <span class="project-desc">
                        {item.basicInfo.desc}
                      </span>
                    </>
                  )
                })
              }
            </div>
          </div>

          <hr className="hr1" />
          <div className="posted">
            <span className="date">Posted On</span>
            <span class="date-value">0/05/2001</span>
            <span class="Location">Location</span>

            {
              projectDetails?.map((item) => {

                return (
                  <>
                    <span class="location-value">
                      {item.basicInfo.address}
                    </span>
                  </>
                )
              })
            }

          </div>

          <div className="count">
            <span class="role">Roles</span>
            <span class="characters">Characters</span>
            <br />
            {
              projectDetails?.map((item) => {

                return (
                  <>
                    <span class="role-count">{item.roles.length}</span>
                  </>
                )
              })
            }
            <span class="character-count">{a}</span>
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

                  {projectDetails?.map((items) => items.roles.map((i, index) => {
                    return (
                      <>
                        <div key={index} className="my-2">
                          <input className="px-2" type="text" name="role" id="role"
                            placeholder={i.role} onChange={handlechange} />
                        </div>
                      </>
                    )
                  }))}


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
