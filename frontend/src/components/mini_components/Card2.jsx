import React from "react";
import { useState } from "react";
import Modal from "./Modal";
import { Link } from "react-router-dom";

const Card2 = ({ card }) => {

    const [model, setModel] = useState(false);
    const name = card.basicInfo.name
    // console.log(card._id)

    return (
        <li>

            <Link to={"/applicantdetails"} state={card._id} >

                <div className="card-title">‘{name}’</div>
                {/* <span className="card-footer">{card.roles} Roles</span> */}

                <div className="card-author d-flex align-items-center">

                    <div className="d-flex flex-column mx-2">
                        <div className="posted-by">Applied by</div>
                        <span>23</span>
                    </div>
                </div>

                {model && <Modal setModel={setModel} info={card} />}
            </Link>
        </li>
    );
};

export default Card2;
