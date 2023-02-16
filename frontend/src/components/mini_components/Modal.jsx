import React from "react";
import axios from "axios";

const Modal = ({ setModel, info, roles }) => {
    const roleApply = (chrId , rId ) => {
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
                console.log(res);
                setModel(false);
                alert("You have successfully applied for this role")
            })
            .catch((err) => {
                console.log(err);
            })
    }
    return (
        <div className="modal-background">
            <div className="modal-container">
                <div className="modal-header">Your profile is weak to apply for this role.</div>
                <div className="modal-body">
                    <div className="modal-name">‘{info.basicInfo.name}’</div>
                    <div className="secondary-text">Roles</div>
                    {roles.map((item, index) => {
                        console.log(item)
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
                                                            <button onClick={() => { roleApply(e._id , item._id) }} className="apply-btn">Apply</button>
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
                <div className="modal-footer">
                    <button
                        className="cancel-btn"
                        onClick={() => {
                            setModel(false);
                        }}
                    >
                        Cancel
                    </button>
                    <span className="mx-3"></span>
                    <button className="update-btn">Update-Profile</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
