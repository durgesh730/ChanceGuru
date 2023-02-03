import React from "react";
import axios from 'axios';
import magnifyingIcon from "../../../assets/icons/find-my-friend.svg";
import maskIcon from "../../../assets/icons/mask.svg";
import {useNavigate} from 'react-router-dom';

const ProjectSummaryForm = ({ display  , values }) => {
    const navigate = useNavigate();
    const basicInfo = values.basicInfo;
    const roles = values.formFields;
    let show = {};
    if (display) {
        show = { display: "block" };
    } else {
        show = { display: "none" };
    }

    const publishProject = () => {
        axios
            .post("http://localhost:5000/project" , {basicInfo : basicInfo , roles : roles} ,  {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            })
            .then((res) => {
                if(res.status == 203){
                    alert(res.data)
                }else{
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
                    <div className="form-desc">Lead (03)</div>
                </div>
                <form id="form1">
                    <input type="text" className="form-control" placeholder="MacDuff : Male, 20-30" />
                    <textarea
                        name=""
                        id="bio"
                        className="form-control text-area"
                        rows="4"
                        placeholder="Details..."
                        maxLength="250"
                    ></textarea>
                    <input type="text" className="form-control" placeholder="Lady MacDuff: Female, 20-30" />
                    <label className="label-desc">Supporting Actor (01)</label>
                    <input type="text" className="form-control" placeholder="Ross : Male, 30-40" />
                    <label className="label-desc">Chorus/ Ensemble (01)</label>
                    <input type="text" className="form-control" placeholder="Thanes : Male, 20-30" />
                    <div className="row">
                        <input type="button" className="col-4 cancel-btn btn btn-lg btn-block my-2" value="Cancel" />
                        <p className="col-1"></p>
                        <input
                            onClick={()=>{publishProject()}}
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
