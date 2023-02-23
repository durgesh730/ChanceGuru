import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

const SubViewProfile = ({display , index, card, msg }) => {
    // console.log(card)
    const [user, setUser] = useState();
    const [d, setd] = useState(1);
    // console.log(cards)
    const getuserData = () => {
        axios
            .get(`http://localhost:5000/profile/${card[index]?.userId}`)
            .then((res) => {
                if (res !== null) {
                    setUser(res.data)
                }
                // console.log(res)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        if(display == "/submission"){
            setd(1);
        }else{
            setd(2);
        }

        if(msg == "Next"){
            index = index + 1 ;
        }else if(msg == "Back"){
            index = index - 1 ;
        }

        getuserData();
    }, [])

    return (
        <>
            <td style={{display: display}}>
                <div className="d-flex justify-content-center align-items-center">
                    <NavLink to={"/browseprofile/:nickdavolt"}  state={{user, card, index , btn : d }} exact>
                        <button>{msg}</button>
                    </NavLink>
                </div>
            </td>
        </>
    )
}

export default SubViewProfile
