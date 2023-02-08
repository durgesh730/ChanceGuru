import React, { useEffect, useState } from 'react'
import kamal from "../../assets/images/kamal.jpeg"


const ApplicantRowCard = ({ Data }) => {

    // console.log(Data)
    const id = Data.userId;
    // console.log(id)

    const [User, SetUser] = useState([]);
    // console.log(User)
    const fetchData = async () => {
        const data = await fetch(`/project/UserId/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const json = await data.json();
        SetUser(json)
        // console.log(json);
    }

    useEffect(() => {
        fetchData();
    }, [SetUser])


    return (
        <div className="lI" style={{ display: "flex", flexDirection: "row", gap: "4rem" }}>
            <div>
                <img src={kamal} alt="" style={{ width: '4rem' }} />
                {User.map((items, i) => {
                    return (<span key={i} className="applicantName">
                        {items.username}
                    </span>)
                })}

            </div>

            <div>
                <span className="applicantStatus">2 hrs ago</span>
            </div>
            <div className="actionButtons" >
                <button>Select</button>
                <button>Reject</button>
            </div>
            <div />
        </div>
    )
}

export default ApplicantRowCard