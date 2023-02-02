import React from "react";
import axios from "axios";

const Modal = ({ setModel, info , roles }) => {
    const userId = JSON.parse(localStorage.getItem("login")).id;
    const seekerId = info.seekerId ; 
    const roleApply = (item) => {
        axios
            .post("http://localhost:5000/jobApplication" , {
                userId : userId ,
                projectId : item.pId ,
                seekerId : seekerId ,
                rid : item.id 
            })
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
                    <div className="modal-name">‘{info.name}’</div>
                    <div className="secondary-text">Roles</div>
                    <div className="modal-roles">
                        {roles.map((item ,index) => {
                            return(
                                <>
                                    <div key={index}>
                                        <div className="role-name">{item.name}</div>
                                        <div className="total-roles">
                                            <button onClick={()=>{roleApply(item)}} className="apply-btn">Apply</button>
                                        </div>
                                    </div>
                                </>
                            )
                        })}
                    </div>
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
