import React from "react";


const RoleLabelForm = ({ display , functions }) => {
    let show = {};
    if (display) {
        show = { display: "block" };
    } else {
        show = { display: "none" };
    }
    const formFields = functions.formFields ;
    const setformFields = functions.setformFields ; 

    
    const handleFormChange = (e, index) => {
        let data = [...formFields];
        data[index].role = e.target.value;
        setformFields(data);
    };

    const addFields = () => {
        let obj = { role: "" , characters : [] };
        setformFields([...formFields, obj]);
    };

    const removeFields = (index) => {
        let data = [...formFields];
        data.splice(index, 1);
        setformFields(data);
    };

    const handleRoles = (e) =>{
        e.preventDefault();
        functions.toggleForm("description");
    }
    
    return (
        <div className="form-body" style={show}>
            <div className="form-container">
                <div className="form-head">Role Labels</div>
                <div className="form-desc">Tell us the Roles to be in action for the project</div>

                <form id="form1" onSubmit={handleRoles}>
                    <input type="button" className="full-width-btn" value="Add Roles" onClick={addFields} />
                    {formFields.map((form, index) => {
                        return (
                            <div key={index} className="d-flex align-items-center">
                                <select
                                    className="form-control form-select"
                                    data-num={index}
                                    name="role"
                                    value={form.role}
                                    onChange={(e) => {
                                        handleFormChange(e, index);
                                    }}
                                    required
                                >
                                    <option value="" disabled selected>
                                        Name the Role
                                    </option>
                                    <option selected={form.role === "Main Role Hero"} value="Supporting Actor">Supporting Actor</option>
                                    <option selected={form.role === "Main Role Hero"} value="Main Role Hero">Main Role Hero</option>
                                    <option selected={form.role === "Main Role Hero"} value="Main Role Villan">Main Role Villan</option>
                                </select>
                                <i className="fa-solid fa-trash-can mx-2 mb-2" onClick={() => removeFields(index)}></i>
                            </div>
                        );
                    })}

                    <div className="row">
                        <input className="col-4 cancel-btn btn btn-lg btn-block my-2" value="Reset" />
                        <p className="col-1"></p>
                        <input type="submit" className="col-7 save-btn btn btn-lg btn-block my-2" value="Save" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RoleLabelForm;
