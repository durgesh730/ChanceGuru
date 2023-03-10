import React, { useEffect, useState } from 'react'
import server from "./server";

const Contect = ({ index, userId }) => {
     const id = userId
    const [userData, setUserData] = useState([]);

    const GetUserData = async (userId) => {
        const data = await fetch(`${server}/profile/Users/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const res = await data.json();
        setUserData(res);
    };


    useEffect(() => {
        GetUserData();
    }, []);

    return (
        <>
            <td>{userData.phone}</td>
        </>
    )
}

export default Contect
