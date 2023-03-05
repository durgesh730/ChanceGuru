import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import server from "./server";

const SubViewProfile = ({display , index, project, card, msg , da }) => {
    const [user, setUser] = useState();
    const [d, setd] = useState(1);
    console.log("user" , user)

    const getuserData = (userid) => {
        axios
            .get(`${server}/profile/${userid}`)
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

        if(!display){
            setd(da);
        }

        getuserData(card[index]?.userId);
    }, [])

    return (
        <>
            <td style={{display: display}}>
                <div className="d-flex justify-content-center align-items-center">
                    <NavLink to={`/browseprofile/:${user?.basicInfo?.fullname}`}  state={{user, card, index , project ,btn : d }} exact>
                        <button>{msg}</button>
                    </NavLink>
                </div>
            </td>
        </>
    )
}

export default SubViewProfile
