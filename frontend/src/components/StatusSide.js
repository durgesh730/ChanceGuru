import axios from 'axios';
import React, { useEffect, useState } from 'react'
import godfather from "../assets/images/godfather.png";


const StatusSide = ({ userId }) => {

    const [cards, setcards] = useState();
    const getuserData = () => {
        axios
            .get(`http://localhost:5000/project/UserId/${userId}`)
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

            {cards?.map((item, index) => {
                return (
                    <>
                        <td>
                            <img src={godfather} />
                            {item.username}
                        </td>
                        <td>Malcolm, Lead</td>
                    </>
                )
            })
            }
        </>
    )
}

export default StatusSide
