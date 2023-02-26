import React, { useState } from "react";
import axios from 'axios';
import magnifyingIcon from "../../../assets/icons/find-my-friend.svg";
import maskIcon from "../../../assets/icons/mask.svg";
import { useNavigate } from 'react-router-dom';

const ProjectSummaryForm = ({ display, values }) => {
    const navigate = useNavigate();
    const basicInfo = values.basicInfo;
    const roles = values.formFields;
    const [showset, setShow] = useState(false)

    // console.log(values)

    let show = {};
    if (display) {
        show = { display: "block" };
    } else {
        show = { display: "none" };
    }

    const handleshow = (e) => {
        let displayProp = e.target.nextElementSibling.style.display
        if(displayProp == "block"){
            e.target.nextElementSibling.style.display = "none"
        }
        else{
            e.target.nextElementSibling.style.display = "block"
        }
    }

    const publishProject = () => {
        axios
            .post("http://localhost:5000/project", { basicInfo: basicInfo, roles: roles }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            })
            .then((res) => {
                if (res.status == 203) {
                    alert(res.data)
                } else {
                    alert("Project Published Successfully");
                    navigate("/seekerdashboard");
                    console.log(res)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <div className="form-body" style={show}>
            <div className="form-container">
                <div className="form-head">{basicInfo.name}</div>
                <div className="form-summary">
                    {basicInfo.desc}
                </div>
                <hr />
                <div className="summary">
                    <div className="summary-head">
                        <img src={magnifyingIcon} />
                        <span>Company Information</span>
                    </div>
                    <div className="summary-info row">
                        <div>
                            <span className="titleSpan">Company</span>
                            <span className="contentSpan">
                                {basicInfo.company + " "}
                                {basicInfo.address}, {basicInfo.city}, {basicInfo.state}
                            </span>
                        </div>

                        <div>
                            <span className="titleSpan">Contact</span>
                            <span className="contentSpan">{basicInfo.phone}</span>
                        </div>

                        <div>
                            <span className="titleSpan">Email</span>
                            <span className="contentSpan">{basicInfo.email}</span>
                        </div>

                        <div>
                            <span className="titleSpan">Facebook</span>
                            <span className="contentSpan">{basicInfo.facebook}</span>
                        </div>

                        <div>
                            <span className="titleSpan">Instagram</span>
                            <span className="contentSpan">{basicInfo.instagram}</span>
                        </div>
                        
                    </div>
                </div>
                <hr />
                <div className="summary">
                    <div className="summary-head">
                        <img src={maskIcon} />
                        <span>Roles Aggregate</span>
                    </div>
                    {/* <div className="form-desc">Lead (03)</div> */}
                </div>
                <form id="form1">
                    {
                        roles.map((item, index) => {
                            return (
                                <>
                                    <div className="row" >
                                        <span className="label-desc">{item.role}(01)</span>
                                        {item.characters?.map((data, index) => {
                                            return (
                                                <>
                                                    <span className=" char my-2" onClick={handleshow} >{data.name}</span>
                                                    <textarea
                                                        style={{ display: `none` }}
                                                        name=""
                                                        id="bio"
                                                        className="form-control text-area"
                                                        rows="4"
                                                        value={data.details}
                                                        maxLength="250"
                                                    ></textarea>
                                                </>
                                            )
                                        })}
                                    </div>
                                </>
                            )
                        })
                    }

                    <div className="d-flex justify-content-between">
                        <input type="button" className="col-4 cancel-btn btn btn-lg btn-block my-2" value="Cancel" />
                        <p className="col-1"></p>
                        <input
                            onClick={() => { publishProject() }}
                            type="button"
                            className="col-7 save-btn btn btn-lg btn-block my-2"
                            value="Save and Publish"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProjectSummaryForm;
