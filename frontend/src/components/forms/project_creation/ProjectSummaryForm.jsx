import React from "react";

import magnifyingIcon from "../../../assets/icons/find-my-friend.svg";
import maskIcon from "../../../assets/icons/mask.svg";

const ProjectSummaryForm = ({ display }) => {
    let show = {};
    if (display) {
        show = { display: "block" };
    } else {
        show = { display: "none" };
    }

    return (
        <div className="form-body" style={show}>
            <div className="form-container">
                <div className="form-head">Shakespeare's Macbeth</div>
                <div className="form-summary">
                    Casting "Macbeth" by William Shakespeare. Set in 11th century Scotland.
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
                                    <td className="summary-name">Company</td>
                                    <td className="summary-desc">
                                        Nuance Theatre Co.,23, Park Broadway, New York, United States
                                    </td>
                                </tr>
                                <tr>
                                    <td className="summary-name">Contact</td>
                                    <td className="summary-desc">(022) 678 897</td>
                                </tr>
                                <tr>
                                    <td className="summary-name">Email</td>
                                    <td className="summary-desc">nuancetheatreco@tesmail.com</td>
                                </tr>
                                <tr>
                                    <td className="summary-name">Facebook</td>
                                    <td className="summary-desc">www.facebook.com/NuanceTheatreCo</td>
                                </tr>
                                <tr>
                                    <td className="summary-name">Instagram</td>
                                    <td className="summary-desc">Nuance Casting (@nuance_co)</td>
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
                        <input type="submit" className="col-4 cancel-btn btn btn-lg btn-block my-2" value="Cancel" />
                        <p className="col-1"></p>
                        <input
                            type="submit"
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
