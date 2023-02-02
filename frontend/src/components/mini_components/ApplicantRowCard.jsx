import React from 'react'
import kamal from "../../assets/images/kamal.jpeg"

const ApplicantRowCard = () => {
    return (
        <div className="lI">
            <img src={kamal} alt="" />
            <span className="applicantName">Jacob Salmon</span>
            <span className="applicantStatus">2 hrs ago</span>
            <div className="actionButtons">
                <button>Select</button>
                <button>Reject</button>
            </div>
            <div />
        </div>
    )
}

export default ApplicantRowCard