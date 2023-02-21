import React from "react";
import { useState , useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RolePref = ({ display  }) => {
    const navigate = useNavigate();
    let show = {};
    if (display) {
        show = { display: "block" };    
    } else {
        show = { display: "none" };
    }

    const [formFields, setformFields] = useState([{ role: "" }]);

    const handleFormChange = (e, index) => {
        let data = [...formFields];
        data[index].role = e.target.value;
        setformFields(data);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        axios.put('http://localhost:5000/profile/rolePref', { formFields },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }
        ).then((res) => {
            alert("Role prefrences saved successfully")
            console.log("data added");
            console.log(res);
            navigate("/");
        })
    };

    const addFields = (e) => {
        e.preventDefault();
        let obj = { role: "" };
        setformFields([...formFields, obj]);
    };

    const removeFields = (index) => {
        let data = [...formFields];
        data.splice(index, 1);
        setformFields(data);
    };

    const handleShow = async () => {
        axios
            .get(`http://localhost:5000/profile/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                if (response.data !== null) {
                    console.log(response.data)
                    if (response.data.rolePref !== 0) {
                        setformFields(response.data.rolePref);
                    }
                }
            })
            .catch((err) => {
                console.log(err.response);
            });
    }

    useEffect(() => {
        handleShow();
    }, [])
    
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
                            {formFields?.map((form, index) => {
                                return (
                                    <div key={index} className="d-flex align-items-center">
                                        <input
                                            name="role"
                                            value={form.role}
                                            onChange={(e) => {
                                                handleFormChange(e, index);
                                            }}
                                            type="text"
                                            className="form-control"
                                            placeholder="Add Role"
                                        />
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
