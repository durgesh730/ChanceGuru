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
                                            className={`toggle-option ${active === item.role && "active-toggle"}`}
                                            onClick={() => { setactive(item.role); updateChar(item.role); }}
                                        >
                                            {item.role}
                                        </div>
                                    </>
                                )
                            })}
                        </div>

                        <div className="scroll_x ">
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
                    </div>
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
            }{" "}
        </>
    );
};

export default RoleDescForm;
