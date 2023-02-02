import React from "react";
import { useState } from "react";
import Modal from "./Modal";


const Card2 = ({ card }) => {
    // console.log(card);
    const [model, setModel] = useState(false);

    return (
        <li>
            <div className="card-title">‘{card.title}’</div>
            <span className="card-footer">{card.roles} Roles</span>
           
            <div className="card-author d-flex align-items-center">
               
                <div className="d-flex flex-column mx-2">
                    <div className="posted-by">Applied by</div>
                    <span>23</span>
                </div>
            </div>
          
            

            {model && <Modal setModel={setModel} info={card} />}
        </li>
    );
};

export default Card2;
