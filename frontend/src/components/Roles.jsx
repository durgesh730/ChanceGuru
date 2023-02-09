import React, { useEffect } from "react";
import Topbar from "./mini_components/Topbar";
import annouce from "../assets/icons/noun-announce-4868354.svg";
import { useState } from "react";
import { useLocation } from "react-router-dom";


const Roles = ({ display }) => {

  const location = useLocation();
  const [projectDetails, setProjectDetails] = useState(location.state);

  const [active, setActive] = useState(0);
  const [leadRoles, setLeadRoles] = useState([])

  // ==== usestate for put request on  role data

  const [val, setVal] = useState([{ role: ""}])
// console.log(val)
  const handlechange = (onChangeValue, i) => {
    const inputData = [...val];
    inputData[i].role = onChangeValue.target.value;
    setVal(inputData)
  }

  const handleadd = () => {
    let obj = { role: "" };
    setVal([...val, obj]);
  };

  // ===== get roles data onchange ======
  // const handlechar = (e, i) => {
  //   const { value } = e.target;
  //   putData[i].role = value;
  // }

  // Initialise the states
  const [state, setState] = useState([]);
  const [answers, setAnswers] = useState({});

  function handleClick() {
    setState([...state, answers]);
    setAnswers({});
  }

  function handleAnswerChange(e) {
    const { name, value } = e.target;
    setAnswers({...answers, [name]: value} )
  }

  // Log the main state when it changes
  useEffect(() =>
   console.log(state), 
   [state]);

  // console.log(answers)


  useEffect(() => {
    if (projectDetails) {
      setLeadRoles(projectDetails.roles[0].characters)
    }
  }, [projectDetails])


  var char = 0;
  var all = new Array();
  var a = 0;

  {
    projectDetails.roles?.map((i) => {
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
  }


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


              <span class="project-name">
                {projectDetails.basicInfo.name}
              </span>{" "}
              <br />
              <span class="project-desc">
                {projectDetails.basicInfo.desc}
              </span>

            </div>
          </div>

          <hr className="hr1" />
          <div className="posted">
            <span className="date">Posted On</span>
            <span class="date-value">0/05/2001</span>
            <span class="Location">Location</span>
            <span class="location-value">
              {projectDetails.basicInfo.address}
            </span>
          </div>

          <div className="count">
            <span class="role">Roles</span>
            <span class="characters">Characters</span>
            <br />
            <span class="role-count">
              {projectDetails.roles.length}
            </span>
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
                    // type="submit"
                    className="full-width-btn"
                    value="Add Roles"
                    onClick={() => handleadd()}
                  />

                  {val.map((data, i) => {
                    return (
                      <input
                        // style={!showInput ? ({ display: "none" }) : ({ display: "block" })}
                        className="py-2" type="text" name="role" id="role"
                        placeholder="add roles" onChange={(e) => handlechange(e, i)} />
                    )
                  })}


                  {projectDetails ? projectDetails.roles?.map((item,i) => {
                     const {_id, role} = item
                    return (
                      <>
                        <div className="my-2">
                          <input
                            className="px-2"
                            // value={putData.role}
                            key={_id}
                            type="text" name={_id} id="role"
                            placeholder={role} onChange={(e)=>handleAnswerChange(e,i)} />
                        </div>
                      </>
                    )
                  }) : <></>}


                  <div className="row">
                    <input
                      type="submit"
                      className="col-4 cancel-btn btn btn-lg btn-block my-2"
                      value="Cancel"
                    />
                    <p className="col-1"></p>
                    <input
                      // type="submit"
                      className="col-7 save-btn btn btn-lg btn-block my-2"
                      value="Save"
                      onClick={handleClick}
                    />
                  </div>
                </form>


                <form id="char-form" style={{ display: "none" }}>
                  <div className="charList row">


                    {projectDetails ? projectDetails.roles?.map((i, index) => {
                      return (
                        <>
                          <div highlighted={active === index ? "true" : "false"}

                            onClick={() => { setActive(index); setLeadRoles(i.characters); toggle(""); }}
                            className="col-lg-3  btn btn-sm btn-block my-2" id="">
                            {i.role}
                          </div>
                        </>
                      )
                    }) : <></>}
                  </div>

                  <div className="d-flex">
                    <p className="mx-1"></p>
                    <input
                      type="submit"
                      className="full-width-btn"
                      value="Add Another Character" />
                  </div>


                  {
                    leadRoles.map((p, i) => {
                      return (
                        <>
                          <input key={i} type="text" className="form-control" placeholder={`${p.name}`} />
                          <select className="form-control form-select" id="exampleFormControlSelect1" >
                            <option value="chorus" disabled selected>
                              {p.gender}
                            </option>
                            <option value="male">Male</option>
                            <option value="male">Female</option>
                          </select>
                        </>
                      )
                    }
                    )
                  }

                  <textarea
                    name=""
                    id=""
                    className="form-control text-area"
                    rows="5"
                    placeholder="Details..."
                    maxlength="250">
                  </textarea>

                  {
                    leadRoles.map((p) => {
                      return (
                        <>
                          <select
                            className="form-control form-select"
                            id="exampleFormControlSelect1"
                          >
                            <option value="" disabled selected>
                              {p.age}
                            </option>
                            <option value="male">19</option>
                            <option value="female">20</option>
                            <option value="female">21</option>
                            <option value="female">22</option>
                          </select>
                        </>
                      )
                    }
                    )
                  }

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
