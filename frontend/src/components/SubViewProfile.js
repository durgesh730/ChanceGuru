import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import server from "./server";

const SubViewProfile = ({ display, jobapplicationId, index, project, card, msg , da}) => {
    const [user, setUser] = useState();
    const [d, setd] = useState(1);
    const getuserData = () => {
        axios
            .get(`${server}/profile/${card[index]?.userId}`)
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
        if(!display){
            setd(da);
        }

        getuserData(card[index]?.userId);
    }, [])

    return (
        <>
            <td style={{ display: display }}>
                <div className="d-flex justify-content-center align-items-center">
                    <NavLink to={`/browseprofile/:${user?.basicInfo?.fullname}`}  state={{user, jobapplicationId, card, index , project ,btn : d }} exact>
                        <button>{msg}</button>
                    </NavLink>
                </div>
            </td>
        </>
    )
}

export default SubViewProfile
