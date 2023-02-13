import axios from 'axios';
import React, { useEffect, useState } from 'react'
import godfather from "../assets/images/godfather.png";


const StatusSide = ({ userId, charDetails, charId }) => {

    // console.log(charDetails)

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
        // getcharactersData()
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
                    </>
                )
            })
            }

            {charDetails?.map((i)=> i.roles?.map((item, index)=>
             item.characters?.map((data, index) =>{ 
                    var id = data._id; 
                    return (
                         id == charId ? <td>{data.name}</td> : '' 
                    )
                }
            )))}
        </>
    )
}

export default StatusSide
