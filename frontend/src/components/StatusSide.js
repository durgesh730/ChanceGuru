import axios from 'axios';
import React, { useEffect, useState } from 'react'
import godfather from "../assets/images/godfather.png";


const StatusSide = ({ charId, roleId, project, userId }) => {
    const [cards, setcards] = useState([]);
    const [character, setcharacter] = useState("");
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

    // const getcharactersData = () => {
    //     axios
    //         .get(`http://localhost:5000/project/UserId/${charId}`)
    //         .then((res) => {
    //             if (res !== null) {
    //                 setcards(res.data)
    //             }
    //             // console.log(res)
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    // }

    useEffect(() => {
        getuserData();
        (project.roles).map(item => {
            if (item._id === roleId) {
                (item.characters).map(chr => {
                    if (chr._id === charId) {
                        setcharacter(chr.name)
                    }
                })
            }
        });
    }, [])

    return (
        <>
            <td>
                <img src={godfather} />
                {cards[0]?.username}
            </td>
            <td>
                {character}
            </td>
        </>
    )
}

export default StatusSide
