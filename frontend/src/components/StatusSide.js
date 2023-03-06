import axios from 'axios';
import React, { useEffect, useState } from 'react'


const StatusSide = ({ charId, roleId, project, userId }) => {
    const [cards, setcards] = useState([]);
    const [character, setcharacter] = useState("");
    const [img, setImg] = useState();
    const getuserData = () => {
        axios
            .get(`http://localhost:5000/project/UserId/${userId}`)
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
            .get(`http://localhost:5000/profile/${userId}`)
            .then((res) => {
                if (res !== null) {
                    setImg(res.data.photos)
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
            <td>
                {
                    img?.map((item, i) => {
                        return (
                            (i === 0) ? <img src={item.link} /> : ("")
                        )
                    })
                }
                {cards[0]?.username}
            </td>
            <td>
                {character}
            </td>
        </>
    )
}

export default StatusSide
