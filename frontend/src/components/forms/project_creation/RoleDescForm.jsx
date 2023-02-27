import React, { useState, useEffect, useRef } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import CharacterCard from "../../mini_components/CharacterCard";

const RoleDescForm = ({ display, functions }) => {
    const formFields = functions.formFields;
    const setformFields = functions.setformFields;
    const roleData = functions.formFields;
    console.log(roleData)
    const [active, setactive] = useState(roleData[0].role);
    const [showchar, setshowchar] = useState([]);
    const [charData, setcharData] = useState({
        name: "",
        gender: "",
        details: "",
        age: ""
    })
    console.log(formFields);
    let show = {};
    if (display) {
        show = { display: "block" };
    } else {
        show = { display: "none" };
    }

    const [toEdit, setToEdit] = useState({});

    const updateChar = (id) => {
        let bool = false;
        formFields.forEach(item => {
            if (item.role === id) {
                setshowchar(item.characters);
                bool = true;
            }
        })
        if (!bool) {
            setshowchar([]);
        }
    }

    const addChar = () => {
        if (charData.age === "" || charData.details === "" || charData.gender === "" || charData.name === "") {
            alert("All fields are required");
            return;
        }

        formFields.forEach(item => {
            if (item.role === active) {
                const data = item.characters;
                const newData = [...data, charData];
                item.characters = newData;
            }
        })

        updateChar(active);
    }

    const handleDesc = () => {
        let bool = false;
        formFields.forEach((item) => {
            if (item.characters.length === 0) {
                bool = true;
                return;
            }
        })
        if (bool) {
            alert("There should be atleat one formFields for each role");
        } else {
            setformFields(formFields);
            functions.toggleForm("summary");
        }
    }

    useEffect(() => {
        setactive(functions.formFields[0].role)
        setformFields(functions.formFields)
    }, [])

    const slideDiv = useRef("");

    // let width = box.offsetWidth;
    // console.log(box.offsetWidth);

    const prevCon = (e) => {
        e.preventDefault();
        let width = slideDiv.current.offsetWidth;
        slideDiv.current.scrollLeft = slideDiv.current.scrollLeft - width;
        console.log(slideDiv);
    };
    const nextCon = (e) => {
        e.preventDefault();
        let width = slideDiv.current.offsetWidth;
        slideDiv.current.scrollLeft = slideDiv.current.scrollLeft + width;
    };

    let name, value;
  const handleEditChange = (e) => {
    name = e.target.name;
    value = e.target.value;

    setToEdit({ ...toEdit, [name]: value });
  };

  function handleEditFormSubmit(e){
    e.preventDefault()
    if (toEdit.age === "" || toEdit.details === "" || toEdit.gender === "" || toEdit.name === "") {
        alert("All fields are required");
        return;
    }
    let prevChars = showchar
    let indexInChars = toEdit.indexInChars
    delete toEdit.indexInChars
    prevChars[indexInChars] = toEdit

    setshowchar(prevChars)

    setToEdit({})
  }

  function handleEditCancel(e){
    e.preventDefault()
    setToEdit({})
  }
  
    

    return (
        <>
            {" "}
            {
                <div className="form-body" style={show}>
                    <div className="form-container">
                        <div className="form-head">Role Description</div>
                        <div className="form-desc">Brief us about each role's description.</div>
                        <div className="form-toggle d-flex justify-content-between  ">
                            {roleData.map((item, index) => {
                                return (
                                    <>
                                        <div
                                            className={`toggle-option ${active == item.role && "active-toggle"}`}
                                            onClick={() => { setactive(item.role); updateChar(item.role); }}
                                        >
                                            {item.role}
                                        </div>
                                    </>
                                )
                            })}
                        </div>

                        {showchar.length > 0 && (<div className="scroll_x ">
                            <div className="container-fluid experience_container">
                                <div className="ec_child" ref={slideDiv}>
                                    {showchar.map((item, index) => {
                                        return (
                                            <CharacterCard
                                                index={index}
                                                cardData={item}
                                                toEdit={toEdit}
                                                setToEdit={setToEdit}
                                            />
                                        );
                                    })}
                                </div>
                                <div className="controllers">
                                    <button onClick={prevCon}>
                                        <BsChevronCompactLeft />
                                    </button>
                                    <button onClick={nextCon}>
                                        <BsChevronCompactRight />
                                    </button>
                                </div>
                            </div>
                        </div>)}
                        <div>

                            <input type="button" className="full-width-btn" value="Add Another Character" />
                            <input type="text" onChange={(e) => { setcharData({ ...charData, name: e.target.value }) }} className="form-control" placeholder="formFields Name" />
                            <select onChange={(e) => { setcharData({ ...charData, gender: e.target.value }) }} className="form-control form-select">
                                <option value="" disabled selected>
                                    Gender
                                </option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            <textarea
                                onChange={(e) => { setcharData({ ...charData, details: e.target.value }) }}
                                name=""
                                id=""
                                className="form-control text-area"
                                rows="5"
                                placeholder="Details..."
                                maxLength="250"
                            ></textarea>
                            <select className="form-control form-select" onChange={(e) => { setcharData({ ...charData, age: e.target.value }) }} >
                                <option value="" disabled selected>
                                    Age
                                </option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                            </select>
                            <div className="row">
                                <input onClick={(e) => { e.preventDefault(); addChar() }}
                                    type="button"
                                    className="col-7 save-btn btn btn-lg btn-block my-2"
                                    value="Add"
                                />
                                <input onClick={(e) => { e.preventDefault(); handleDesc() }}
                                    type="submit"
                                    className="col-7 save-btn btn btn-lg btn-block my-2"
                                    value="Save"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                
            }
            {
                    JSON.stringify(toEdit) !== "{}"
                    &&
                <div className="editCharacterPopUp"
                    style={{ position: "absolute", left: "419px", top: "130px", width: "693px", height: "434px", backgroundColor: "#fff", padding: "29px 44px 24px 43px" }}
                >
                    <div style={{marginLeft:"247px", fontSize: "18px",fontWeight: "bold",fontStretch: "normal",fontStyle: "normal",  lineHeight: "1.28",letterSpacing: "normal",textAlign: "left",color: "#8443e5" }} >
                        Edit Character
                    </div>
                    <div>
                        <input type="text" className="form-control" id="" name="name"
                              value={toEdit.name}
                              onChange={handleEditChange} />
                        <select className="form-control form-select"  name="gender"
                              value={toEdit.gender}
                              onChange={handleEditChange} >
                            <option value="" disabled selected>
                                Gender
                            </option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div>
                        <textarea
                            
                            name="details"
                            id=""
                            className="form-control text-area"
                            rows="5"
                            placeholder="Details..."
                            maxLength="250"
                            value={toEdit.details}
                              onChange={handleEditChange}
                        ></textarea>
                    </div>
                    <div>
                        <select className="form-control form-select" value={toEdit.age}
                              onChange={handleEditChange}
                              name="age">
                            <option value="" disabled>
                                Age
                            </option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                        </select>
                    </div>
                    <div>
                        <input
                            type="button"
                            className="cancel-btn btn btn-lg btn-block"
                            value="Cancel"
                            onClick={handleEditCancel}
                        />
                        <input onClick={handleEditFormSubmit }
                            type="submit"
                            className="col-7 save-btn btn btn-lg btn-block my-2"
                            value="Save"
                        />
                    </div>
                </div>
            }
            {" "}
        </>
    );
};

export default RoleDescForm;
