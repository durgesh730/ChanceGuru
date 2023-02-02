import React , {useContext} from "react";
import { useState , useEffect } from "react";
import axios from "axios";

const RoleLabelForm = ({ display }) => {
    let show = {};
    if (display) {
        show = { display: "block" };
    } else {
        show = { display: "none" };
    }
    const pId = localStorage.getItem('pojectId');
    const [formFields, setformFields] = useState([{ roles: "" }]);
    const roleData = JSON.parse(localStorage.getItem("roles"));

    
    const handleFormChange = (e, index) => {
        let data = [...formFields];
        data[index].roles = e.target.value;
        setformFields(data);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        formFields.forEach(item =>{
            console.log(item.roles);
            axios
                .post("http://localhost:5000/projects/createrole", {
                    name: item.roles,
                    pId : parseInt(pId)
                })
                .then((res) => {
                    if(localStorage.getItem("roles")){
                        let data = JSON.parse(localStorage.getItem("roles"));
                        let newData = [...data , {id: res.data.data.insertId , roles : item.roles}];
                        localStorage.setItem("roles" , JSON.stringify(newData));
                    }else{
                        let data = [{id:res.data.data.insertId , roles : item.roles}];
                        localStorage.setItem("roles" , JSON.stringify(data));
                    }
                    alert(`Role data saved with id ${res.data.data.insertId}`);
                    console.log("data added");
                });
        })
    };

    const addFields = () => {
        let obj = { roles: "" };
        setformFields([...formFields, obj]);
    };

    const removeFields = (index) => {
        let data = [...formFields];
        data.splice(index, 1);
        setformFields(data);
    };

    useEffect(() => {
        if(roleData){
            setformFields(roleData)
        }
    }, [])
    
    return (
        <div className="form-body" style={show}>
            <div className="form-container">
                <div className="form-head">Role Labels</div>
                <div className="form-desc">Tell us the Roles to be in action for the project</div>

                <form id="form1" onSubmit={handleFormSubmit}>
                    <input className="full-width-btn" value="Add Roles" onClick={addFields} />
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
                                    <option selected={form.roles === "Main Role Hero"} value="Supporting Actor">Supporting Actor</option>
                                    <option selected={form.roles === "Main Role Hero"} value="Main Role Hero">Main Role Hero</option>
                                    <option selected={form.roles === "Main Role Hero"} value="Main Role Villan">Main Role Villan</option>
                                </select>
                                <i className="fa-solid fa-trash-can mx-2 mb-2" onClick={() => removeFields(index)}></i>
                            </div>
                        );
                    })}

                    <div className="row">
                        <input className="col-4 cancel-btn btn btn-lg btn-block my-2" value="Cancel" />
                        <p className="col-1"></p>
                        <input type="submit" className="col-7 save-btn btn btn-lg btn-block my-2" value="Save" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RoleLabelForm;
