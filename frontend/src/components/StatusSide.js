import axios from 'axios';
import React, { useEffect, useState } from 'react'
import server from "./server";
import { FcBusinessman } from 'react-icons/fc';

const StatusSide = ({ charId, roleId, project, userId }) => {
    const [cards, setcards] = useState([]);
    const [character, setcharacter] = useState("");
    const [img, setImg] = useState();
    const getuserData = () => {
        axios
            .get(`${server}/project/UserId/${userId}`)
            .then((res) => {
                if (res !== null) {
                    setcards(res.data)
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const getProfileImages = () => {
        axios
            .get(`${server}/auth/UserImageFromUserTable/${userId}`)
            .then((res) => {
                if (res !== null) {
                    setImg(res.data)
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        getuserData();
        getProfileImages();
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
            <td className='d-flex align-items-center'>
                {
                    img?.map((item, i) => {
                        return (
                            (item.link) ? <img src={item.link} /> : (
                             <span style={{fontSize:"3.5rem"}} > <FcBusinessman/></span> 
                            )
                        )
                    })
                }

                <p className='m-0'>{cards[0]?.username}</p>
            </td>
            <td>
                {character}
            </td>
        </>
    )
}

export default StatusSide
