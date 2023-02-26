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

    const handleshow = (i) => {
        if (showset === false) {
            setShow(true)
        } else {
            setShow(false)
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
                    navigate("seekerdashboard");
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
                        <table className="table table-borderless">
                            <tbody>
                                <tr>
                                    <td className="summary-name">{basicInfo.company}</td>
                                    <td className="summary-desc">
                                        {basicInfo.address}, {basicInfo.city}, {basicInfo.state}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="summary-name">Contact</td>
                                    <td className="summary-desc">{basicInfo.contact}</td>
                                </tr>
                                <tr>
                                    <td className="summary-name">Email</td>
                                    <td className="summary-desc">{basicInfo.email}</td>
                                </tr>
                                <tr>
                                    <td className="summary-name">Facebook</td>
                                    <td className="summary-desc">{basicInfo.facebook}</td>
                                </tr>
                                <tr>
                                    <td className="summary-name">Instagram</td>
                                    <td className="summary-desc">{basicInfo.instagram}</td>
                                </tr>
                            </tbody>
                        </table>
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
                                                    <span className=" char my-2" onClick={() => { handleshow() }} >{data.name}</span>
                                                    <textarea
                                                        style={showset ? { display: `block` } : { display: `none` }}
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
