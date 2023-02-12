import React, { useEffect, useState } from 'react'
import kamal from "../../assets/images/kamal.jpeg"


const ApplicantRowCard = ({ Data }) => {

    // console.log(Data)
    const id = Data.userId;
    // console.log(id)
    const _id = Data._id;

    const [select, setSelect] = useState('selected')
    const [rejected, setRejected] = useState('rejected')

    const [User, SetUser] = useState([]);
    // console.log(User)
    const fetchData = async () => {
        const data = await fetch(`http://localhost:5000/project/UserId/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const json = await data.json();
        SetUser(json)
        // console.log(json);
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
        console.log(res)
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
        console.log(res)
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