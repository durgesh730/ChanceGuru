import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import kamal from "../../assets/images/kamal.jpeg"


const ApplicantRowCard = ({ Data, applied }) => {

    var a = applied;
    var id = Data.userId

    const _id = Data._id;

    const [select, setSelect] = useState('selected')
    const [rejected, setRejected] = useState('rejected')

    const [User, SetUser] = useState([]);
    const fetchData = async () => {
        const data = await fetch(`http://localhost:5000/profile/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const json = await data.json();
        SetUser([json])
    }

    const handleSelect = async () => {
        const data = await fetch(`http://localhost:5000/project/Select/${_id}/${2}`, {
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


    console.log("user", User)


    return (
        <div >
            {/* <div> */}

            {User?.map((items, i) => {
                return (
                    <>
                        <NavLink
                            to={"/browseprofile/:nickdavolt"}
                            state={{ user: items, card: [], index: 0, btn: 0 }}
                            exact
                        >
                            <div className="lI" >

                                <div className='d-flex align-items-center'>
                                    <img src={items.photos[0]?.link} alt="" style={{ width: '4rem' }} />
                                    <span key={i} className="applicantName">
                                        {items.basicInfo.fullname}
                                    </span>
                                </div>
                                <div >
                                    <span className="applicantStatus">{getLastUpdate(items.updatedAt)}</span>
                                </div>
                                <div className="actionButtons" >
                                    <button onClick={handleSelect} >Select</button>
                                    <button onClick={handleReject} style={{ borderColor: "red", color: "red" }} >Reject</button>
                                </div>
                            </div>
                        </NavLink>
                    </>
                )
            })}

            {/* </div> */}

        </div>
    )
}

export default ApplicantRowCard