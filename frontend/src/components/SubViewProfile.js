import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

const SubViewProfile = ({userId, statusId }) => {

    const [cards, setcards] = useState();
    const getuserData = () => {
        axios
            .get(`http://localhost:5000/profile/${userId}`)
            .then((res) => {
                if (res !== null) {
                    setcards(res.data)
                }
                // console.log(res)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        getuserData();
    }, [])

    return (
        <>
            <td>
                <div className="d-flex justify-content-center align-items-center">
                    <NavLink to={"/browseprofile/:nickdavolt"} state = {cards} exact>
                        <button>View Profile</button>
                    </NavLink>
                </div>
            </td>
        </>
    )
}

export default SubViewProfile
