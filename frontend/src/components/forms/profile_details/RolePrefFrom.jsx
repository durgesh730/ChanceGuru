import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RolePref = ({ display , profileData }) => {
    const navigate = useNavigate();
    let show = {};
    if (display) {
        show = { display: "block" };
    } else {
        show = { display: "none" };
    }

    const [formFields, setformFields] = useState([{ roles: "" }]);

    const handleFormChange = (e, index) => {
        let data = [...formFields];
        data[index].roles = e.target.value;
        setformFields(data);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        axios.put('http://localhost:5000/profile/rolePref', {
            roles:formFields[0].roles
        },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }
        ).then((res) => {
            alert("Role prefrences saved successfully")
            console.log("data added");
            console.log(res);
            navigate("/talentdashboard");
        })
    };

    const addFields = (e) => {
        e.preventDefault();
        let obj = { roles: "" };
        setformFields([...formFields, obj]);
    };

    const removeFields = (index) => {
        let data = [...formFields];
        data.splice(index, 1);
        setformFields(data);
    };

    return (
        <>
            {
                <div className="form-body" style={show}>
                    <div className="form-container">
                        <div className="form-head">Role Prefrences</div>
                        <div className="form-desc">Let us know about you to suggest the best for you.</div>

                        <form onSubmit={handleFormSubmit}>
                            <button className="full-width-btn" onClick={addFields}>
                                Add Roles
                            </button>
                            {formFields.map((form, index) => {
                                return (
                                    <div key={index} className="d-flex align-items-center">
                                        <select
                                            className="form-control form-select"
                                            data-num={index}
                                            name="role"
                                            value={form.roles}
                                            onChange={(e) => {
                                                handleFormChange(e, index);
                                            }}
                                        >
                                            <option value="" disabled selected>
                                                Name the Role
                                            </option>
                                            <option value="Supporting Actor">Supporting Actor</option>
                                            <option value="Main Role Hero">Main Role Hero</option>
                                            <option value="Main Role Villan">Main Role Villan</option>
                                        </select>
                                        <i
                                            className="fa-solid fa-trash-can mx-2 mb-2"
                                            onClick={() => removeFields(index)}
                                        ></i>
                                    </div>
                                );
                            })}

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

export default RolePref;
