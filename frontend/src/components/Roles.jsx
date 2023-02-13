import React, { useEffect } from "react";
import Topbar from "./mini_components/Topbar";
import annouce from "../assets/icons/noun-announce-4868354.svg";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import CharacterCard from "./mini_components/CharacterCard";



const Roles = ({ display }) => {

  let rolesForm, charForm, summForm, rolesToggle, charToggle, summToggle

  const location = useLocation();
  const [projectDetails, setProjectDetails] = useState(location.state);
  const [roles, setRoles] = useState(projectDetails.roles);

  // for character form
  const [activeRole, setActiveRole] = useState(roles[0])
  const [chars, setChars] = useState(activeRole.characters)
  const [toEdit, setToEdit] = useState({})
  //console.log("Active Role is: ", activeRole)
  //console.log("Active characters are: ", chars)

  useEffect(() => {
    setChars(activeRole.characters)
    //console.log("Active Role is: ", activeRole)
    //console.log("Active characters are: ", chars)
  }, [activeRole])


  // Total roles count to set in the project details card
  var totalRolesCount = 0
  function setTotalRoleCount() {
    let count = 0
    for (let index = 0; index < [...roles].length; index++) {
      const element = [...roles][index];
      count += element.characters.length
    }
    totalRolesCount = count
  }

  // useEffect for re calculating total characters after adding roles
  useEffect(() => {
    setTotalRoleCount()

  }, [roles])

  setTotalRoleCount()

  const changeHandler = (e) => {
    setProjectDetails({ ...projectDetails, [e.target.name]: e.target.value });
  };
  // const changeRoleHandler = (e) => {
  //   setRolesDetails({ ...rolesDetails, [e.target.name]: e.target.value });
  // };

  function handleAddRole(e) {
    e.preventDefault()
    let obj = { role: "Add Role", characters: [] };
    setRoles([...roles, obj]);

  }

  const handleFormChange = (e, index, attrToChange) => {
    let data = [...roles];
    if (attrToChange === "roleName") {

      data[index].role = e.target.value;
    }
    setRoles(data);
  };


  const handleRoleUpdateForm = (e) => {
    e.preventDefault()
    // //console.log("Submitting edited form");
    setProjectDetails({ ...projectDetails, roles })
    axios.put('http://localhost:5000/project/changeRoles', {
      project: projectDetails
    },
      {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      }
    ).then((res) => {
      alert(`${res.data.basicInfo.name} Roles Updated suceessfully`)
      //console.log("data added");
      //console.log(res)
    })
  }

  //console.log("Roles array: ", roles)

  function handleAddCharacter(e){
    e.preventDefault()
    setToEdit({name:"Character Name",age:"",gender:"",indexInChars:activeRole.characters.length})
  }

  let name,value;
  const handleEditChange = (e) =>{
    name = e.target.name;
    value = e.target.value;

    setToEdit({...toEdit,[name]:value})
  }

  function handleCharacterUpdateForm(e){
    e.preventDefault()
    
    let prevChars = chars
    let indexInChars = toEdit.indexInChars
    delete toEdit.indexInChars
    prevChars[indexInChars] = toEdit

    console.log(prevChars)

    setActiveRole({...activeRole,prevChars})
    console.log(activeRole)

    setProjectDetails({...projectDetails,activeRole})
    
    axios.put('http://localhost:5000/project/changeRoles', {
      project: projectDetails
    },
      {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      }
    ).then((res) => {
      alert(`${res.data.basicInfo.name} Roles Updated suceessfully`)
      //console.log("data added");
      //console.log(res)
    })

  }


  function getAllForms() {
    rolesForm = document.getElementById("roles-form");
    charForm = document.getElementById("char-form");
    summForm = document.getElementById("summ-form");
    rolesToggle = document.getElementById("roles-toggle");
    charToggle = document.getElementById("char-toggle");
    summToggle = document.getElementById("summ-toggle");
  }

  

  // //console.log(charForm)

  const toggle = (cur_form) => {
    getAllForms()
    if (cur_form == "roles") {
      rolesForm.style.display = "block";
      charForm.style.display = "none";
      // summForm.style.display = "none";
      rolesToggle.classList.add("active-toggle");
      charToggle.classList.remove("active-toggle");
      summToggle.classList.remove("active-toggle");

    } else {
      charForm.style.display = "block";
      rolesForm.style.display = "none";
      // summForm.style.display = "none";
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

              <>
                <span class="project-name">{projectDetails.basicInfo.name}</span>{" "}
                <br />
                <span class="project-desc">
                  {projectDetails.basicInfo.desc}
                </span>
              </>

            </div>
          </div>

          <hr className="hr1" />
          <div className="posted">
            <span className="date">Posted On</span>
            <span class="date-value">0/05/2001</span>
            <span class="Location">Location</span>

            <>
              <span class="location-value">
                {projectDetails.basicInfo.address}
              </span>
            </>

          </div>

          <div className="count">
            <span class="role">Roles</span>
            <span class="characters">Characters</span>
            <br />

            <>
              <span class="role-count">{projectDetails.roles.length}</span>
            </>

            <span class="character-count">{totalRolesCount}</span>
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

                <form id="roles-form" onSubmit={handleRoleUpdateForm} >
                  <button
                    // type="submit"
                    className="full-width-btn cursor-pointer"
                    value="Add Roles"
                    onClick={handleAddRole}
                  >Add Role</button>




                  {roles.map((item, index) => {
                    return (
                      <>
                        <div key={index} className="my-2">
                          <input className="px-2" type="text" name="role" id="role" value={item.role}
                            placeholder={item.role} onChange={(e) => {
                              handleFormChange(e, index, "roleName");
                            }} />
                        </div>
                      </>
                    )
                  })}


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
                    />
                  </div>
                </form>


                <form id="char-form" style={{ display: "none" }} onSubmit={handleCharacterUpdateForm} >
                  <div className="charList row">


                    {roles.map((item, index) => {
                      return (
                        <>
                          <div
                            className="col-lg-3  btn btn-sm btn-block my-2"
                            onClick={() => { setToEdit({}); setActiveRole(item) }}
                            style={{ color: activeRole === item ? "#8443e5" : "initial" }}
                          >
                            {item.role}
                          </div>
                        </>
                      )
                    })}

                  </div>

                  <div className="d-flex">
                    <p className="mx-1"></p>

                  </div>
                  {
                    chars.map((item, index) => {
                      return (
                        <CharacterCard index={index} cardData={item} toEdit={toEdit}  setToEdit={setToEdit}  />
                      )
                    })
                  }
                  <input
                    type="submit"
                    className="full-width-btn"
                    value="Add Another Character"
                    onClick={handleAddCharacter}
                  />
                  {
                    JSON.stringify(toEdit) !== '{}' &&
                    <>

                      <input
                        type="text"
                        className="form-control"
                        placeholder="Character Name"
                        name="name"
                        value={toEdit.name}
                        onChange={handleEditChange}
                      />
                      <select
                        className="form-control form-select"
                        id="exampleFormControlSelect1"
                        name="gender"
                        value={toEdit.gender}
                        onChange={handleEditChange}
                      >
                        <option value="chorus" disabled>
                          Gender
                        </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                      <textarea
                        name="desc"
                        id=""
                        className="form-control text-area"
                        rows="5"
                        placeholder="Details..."
                        maxlength="250"
                        value={toEdit.desc}
                        onChange={handleEditChange}
                      ></textarea>
                      <select
                        className="form-control form-select"
                        id="exampleFormControlSelect1"
                        value={toEdit.age}
                        onChange={handleEditChange}
                        name="age"
                      >
                        <option value="" disabled>
                          Age
                        </option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
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
                    </>
                  }



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
