import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import kamal from "../../assets/images/kamal.jpeg"
import Images from '../Images';
import server from '../server';

const ApplicantRowCard = ({ Data, applied }) => {
    var a = applied;
    var id = Data.userId

    const _id = Data._id;

    const [select, setSelect] = useState('selected')
    const [rejected, setRejected] = useState('rejected')

    const [User, SetUser] = useState([]);
    const fetchData = async () => {
        const data = await fetch(`${server}/profile/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const json = await data.json();
        SetUser([json])
    }

    const handleSelect = async () => {
        const data = await fetch(`${server}/project/Select/${_id}/${Data.status == "applied" ? 1 : 2}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ select })
        })
        const res = await data.json();
        if (res) {
            Data.status = "selected";
            alert("Candidate has been selected successfully");
            window.location.reload();
        }
    }

    const handleReject = async () => {
        const data = await fetch(`${server}/project/Reject/${_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ rejected })
        })
        const res = await data.json();
        if (res) {
            Data.status = "selected";
            alert("Candidate has been rejected");
            window.location.reload();
        }
    }


    useEffect(() => {
        fetchData();
    }, [SetUser])

    function getLastUpdate(lastUpDate) {
        if (lastUpDate == null) {
            return `NA`
        }
        let lastDate = new Date(lastUpDate)
        let newDate = new Date()

        let yearDifference = newDate.getFullYear() - lastDate.getFullYear()
        if (yearDifference !== 0) {
            return `${yearDifference} years ago`
        }

        let monthsDifference = newDate.getMonth() - lastDate.getMonth()
        if (monthsDifference !== 0) {
            return `${monthsDifference} months ago`
        }

        let daysDifference = newDate.getDate() - lastDate.getDate()
        if (daysDifference !== 0) {
            return `${daysDifference} days ago`
        }

        let hoursDifference = newDate.getHours() - lastDate.getHours()
        if (hoursDifference !== 0) {
            return `${hoursDifference} hrs ago`
        }

        let minutesDifference = newDate.getMinutes() - lastDate.getMinutes()
        if (minutesDifference !== 0) {
            return `${minutesDifference} hrs ago`
        }

        let secondsDifference = newDate.getSeconds() - lastDate.getSeconds()
        return `${secondsDifference} seconds ago`

    }

    return (
        <div >
            {User?.map((items, i) => {
                console.log(items, "ite")
                return (
                    <>
                        <div className="lI" >
                            <div className='d-flex align-items-center'>
                                <NavLink
                                    to={`/browseprofile/:${items.basicInfo.fullname}`}
                                    state={{ user: items, card: [Data], index: 0, btn: 3 }}
                                    exact
                                >
                                    <Images item={items} />
                                    <span key={i} className="applicantName">
                                        {items.basicInfo.fullname}
                                    </span>
                                </NavLink>
                            </div>
                            <div >
                                <span className="applicantStatus">{getLastUpdate(items.updatedAt)}</span>
                            </div>
                            {
                                Data.status === "rejected" || Data.status === "selected" ?
                                    Data.status :
                                    <div className="actionButtons" >
                                        <button onClick={handleSelect} >Select</button>
                                        <button onClick={handleReject} style={{ borderColor: "red", color: "red" }} >Reject</button>
                                    </div>
                            }
                        </div>
                    </>
                );
            })}
        </div>
    )
}

export default ApplicantRowCard