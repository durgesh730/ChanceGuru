import React, { useEffect, useState } from 'react'
import kamal from "../../assets/images/kamal.jpeg"


const ApplicantRowCard = ({ Data }) => {

    const id = Data.userId;
    const _id = Data._id;

    const [select, setSelect] = useState('selected')
    const [rejected, setRejected] = useState('rejected')

    const [User, SetUser] = useState([]);
    const fetchData = async () => {
        const data = await fetch(`http://localhost:5000/project/UserId/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const json = await data.json();
        SetUser(json)
    }

    const handleSelect = async () => {
        const data = await fetch(`http://localhost:5000/project/Select/${_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ select })
        })
        const res = await data.json();
    }

    const handleReject = async () => {
        const data = await fetch(`http://localhost:5000/project/Reject/${_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ rejected })
        })
        const res = await data.json();
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
                <button onClick={handleSelect} >Select</button>
                <button onClick={handleReject} >Reject</button>
            </div>
            <div />
        </div>
    )
}

export default ApplicantRowCard