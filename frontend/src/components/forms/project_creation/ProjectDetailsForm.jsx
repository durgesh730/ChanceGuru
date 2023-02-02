import React , {useContext} from "react";
import { useState } from "react";
import axios from "axios";
import PhoneInput from "react-phone-number-input";
import AuthContext from "../../AuthContext";

const ProjectDetailsForm = ({ display }) => {
    const auth = useContext(AuthContext);
    let show = {};
    if (display) {
        show = { display: "block" };
    } else {
        show = { display: "none" };
    }
    const [value, setValue] = useState();

    const [projectDetails, setProjectDetails] = useState({
        name: "",
        description: "",
        company_name: "",
        company_address: "",
        city: "",
        state: "",
        country: "",
        email: "",
        number: "",
        facebook: "",
        seekerId:"1",
        roleId_List:"[4,5,6]",
        instagram: "",
    });

    const handleInputChange = (e) => {
        setProjectDetails({ ...projectDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        console.log(projectDetails);
        e.preventDefault();
        axios
            .post("http://localhost:5000/projects", {
                name: projectDetails.name,
                description: projectDetails.description,
                company_name: projectDetails.company_name,
                company_address: projectDetails.company_address,
                city: projectDetails.city,
                state: projectDetails.state,
                country: projectDetails.country,
                email: projectDetails.email,
                number: projectDetails.number,
                facebook: projectDetails.facebook,
                seekerId:projectDetails.seekerId,
                roleId_list:projectDetails.roleId_List,
                instagram: projectDetails.instagram,
            })
            .then((res) => {
                localStorage.setItem("pojectId" , res.data.data.insertId)
                alert("Project data saved!");
                console.log("data added");
            });
    };

    return (
        <div className="form-body" style={show}>
            <div className="form-container">
                <div className="form-head">Project Creation</div>
                <div className="form-desc">
                    Post your project content to have quick access to the best worldwide talent.
                </div>

                <form id="bio-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Project Name"
                        name="name"
                        value={projectDetails.name}
                        onChange={handleInputChange}
                    />
                    <textarea
                        id="bio"
                        className="form-control text-area"
                        rows="4"
                        placeholder="Details..."
                        maxLength="250"
                        name="description"
                        value={projectDetails.description}
                        onChange={handleInputChange}
                    ></textarea>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Company Name"
                        name="company_name"
                        value={projectDetails.company_name}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Company Address"
                        name="company_address"
                        value={projectDetails.company_address}
                        onChange={handleInputChange}
                    />
                    <div style={{ position: "relative", display: "flex" }}>
                        <select
                            className="form-control form-select"
                            name="city"
                            value={projectDetails.city}
                            onChange={handleInputChange}
                        >
                            <option value="" disabled selected>
                                City
                            </option>
                            <option>Pune</option>
                            <option>Mumbai</option>
                        </select>
                        <p className="mx-2"></p>
                        <select
                            className="form-control form-select"
                            name="state"
                            value={projectDetails.state}
                            onChange={handleInputChange}
                        >
                            <option value="" disabled selected>
                                State
                            </option>
                            <option>Maharashtra</option>
                            <option>Goa</option>
                        </select>
                    </div>
                    <select
                        className="form-control form-select"
                        name="country"
                        value={projectDetails.country}
                        onChange={handleInputChange}
                    >
                        <option value="" disabled selected>
                            Country
                        </option>
                        <option>India</option>
                        <option>USA</option>
                    </select>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Email"
                        name="email"
                        value={projectDetails.email}
                        onChange={handleInputChange}
                    />
                    <input
                        type="nummber"
                        className="form-control"
                        placeholder="Enter phone number"
                        name="number"
                        value={projectDetails.number}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Facebook"
                        name="facebook"
                        value={projectDetails.facebook}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Instagram"
                        name="instagram"
                        value={projectDetails.instagram}
                        onChange={handleInputChange}
                    />
                    <div className="row">
                        <input type="submit" className="col-4 cancel-btn btn btn-lg btn-block my-2" value="Cancel" />
                        <p className="col-1"></p>
                        <input type="submit" className="col-7 save-btn btn btn-lg btn-block my-2" value="Save" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProjectDetailsForm;
