import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Modal = ({ setModel, info, setProfile, roles }) => {

    const navigate = useNavigate();
    const roleApply = (chrId, rId) => {
        axios
            .post("http://localhost:5000/application", {
                pId: info._id,
                roleId: rId,
                charId: chrId,
                status : "applied",
                seekerId:info.seekerId,
            },{ headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },}
            )
            .then((res) => {
                // console.log(res);
                setModel(false);
                alert("You have successfully applied for this role")
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function handleProfile(){
        navigate('/profiledetails')
    }

    return (
        <div className="modal-background my-4">
            <div className="modal-container">
                {/* {profile: 100, talent: 100, photo: 100, education: 100, roles: 50} */}
                {(setProfile.profile && setProfile.talent && setProfile.photo && setProfile.education && setProfile.role ) >= 80 ?
                    ( <div className="modal-header">Your profile is weak to apply for this role.</div>) : ('')}

                <div className="modal-body">
                    <div className="modal-name">‘{info.basicInfo.name}’</div>
                    <div className="secondary-text">Roles</div>
                    {roles.map((item, index) => {
                        // console.log(item)
                        return (
                            <>
                                <div key={index}>
                                    <div className="modal-roles" >
                                        <div className="role-name">{item.role}{"  "}{`(${item.characters.length})`}</div>
                                        <div></div>
                                        {item.characters.map((e, i) => {
                                            return (
                                                <>
                                                    <div key={i}>
                                                        <div className="char-name">{e.name}</div>
                                                        <div className="total-roles">
                                                            {(setProfile.profile && setProfile.talent && setProfile.photo && setProfile.education && setProfile.roles ) >= 80 ?
                                                                (<button style={{backgroundColor:"#8443e5", color:"white" }} onClick={() => { roleApply(e._id, item._id) }} className="apply-btn">Apply</button>) : (<button style={{backgroundColor:"grey", color:"white" }} className="apply-btn">Apply</button>)}                                                           
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        })}
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>
                <div className="modal-footer my-2">
                    <button
                        className="cancel-btn"
                        onClick={() => {
                            setModel(false);
                        }}
                    >
                        Cancel
                    </button>
                    <span className="mx-3"></span>
                    <button onClick={handleProfile} className="update-btn">Update-Profile</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
