import React from "react";
import { useState , useEffect } from "react";
import Modal from "./Modal";
import axios from "axios";

const Card = ({ card }) => {
    console.log(card);
    const basicInfo = card.basicInfo ;
    const role = card.roles ;
    const [model, setModel] = useState(false);
    const [roles, setroles] = useState([])
    const getRoles = () => {
        axios
            .get(`/projects/getroles/${card.id}`)
            .then((res) => {
                setroles(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
      getRoles();
    }, [])
    
    return (
        <li>
            <div className="card-title">‘{basicInfo.name}’</div>
            <div className="card-desc">{basicInfo.desc}</div>
            <div className="card-author d-flex align-items-center">
                <img
                    src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"
                    alt=""
                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
                <div className="d-flex flex-column mx-2">
                    <div className="posted-by">Posted by</div>
                    <div className="author-name">{basicInfo.company}</div>
                </div>
            </div>
            <div className="card-footer">
                <span>{basicInfo.roles} Roles</span>
            </div>
            <button
                className="card-apply btn"
                onClick={() => {
                    setModel(true);
                }}
            >
                Apply
            </button>

            {model && <Modal setModel={setModel} info={card} roles={role} />}
        </li>
    );
};

export default Card;
