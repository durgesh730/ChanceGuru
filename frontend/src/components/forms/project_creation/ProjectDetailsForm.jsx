import React from "react";

const ProjectDetailsForm = ({ display , functions }) => {
    const projectDetails = functions.projectDetails ;
    const setProjectDetails = functions.setProjectDetails ;
    let show = {};
    if (display) {
        show = { display: "block" };
    } else {
        show = { display: "none" };
    }

    const handleInputChange = (e) => {
        setProjectDetails({ ...projectDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        functions.toggleForm("labels");
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
                        required
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
                        required
                    ></textarea>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Company Name"
                        name="company_name"
                        value={projectDetails.company_name}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Company Address"
                        name="company_address"
                        value={projectDetails.company_address}
                        onChange={handleInputChange}
                        required
                    />
                    <div style={{ position: "relative", display: "flex" }}>
                        <select
                            className="form-control form-select"
                            name="city"
                            value={projectDetails.city}
                            onChange={handleInputChange}
                            required
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
                            required
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
                        required
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
                        required
                    />
                    <input
                        type="nummber"
                        className="form-control"
                        placeholder="Enter phone number"
                        name="number"
                        value={projectDetails.number}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Facebook"
                        name="facebook"
                        value={projectDetails.facebook}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Instagram"
                        name="instagram"
                        value={projectDetails.instagram}
                        onChange={handleInputChange}
                        required
                    />
                    <div className="d-flex justify-content-between">
                        <input type="button" className="col-4 cancel-btn btn btn-lg btn-block my-2" value="Reset" />
                        <p className="col-1"></p>
                        <input type="submit" className="col-7 save-btn btn btn-lg btn-block my-2" value="Save" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProjectDetailsForm;
