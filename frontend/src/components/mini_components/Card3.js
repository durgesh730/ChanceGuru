import React, { useEffect } from "react";
import { useState } from "react";
import Modal from "./Modal";
import { Link } from "react-router-dom";
import axios from "axios";

const Card2 = ({ card }) => {

    const [model, setModel] = useState(false);
    const name = card.basicInfo.name
    const id = card._id

    const [apply, setApply] = useState([]);

    const getuserId = () => {
        axios
          .get(`http://localhost:5000/application/project/${id}`)
          .then((res) => {
            if(res.data !== null){
              setApply(res.data)
              // console.log(res.data);
            }
          })
          .catch((err) => {
            console.log(err);
          })
      }
    
      useEffect(() => {
        getuserId();
      }, [])

    return (
        <li>

            <Link to={"/roles"} state={card} >

                <div className="card-title">‘{name}’</div>
                <div className="card-author d-flex align-items-center">
                    <div className="d-flex flex-column mx-2">
                        <div className="posted-by">Applied by</div>
                        <span>{apply.length}</span>
                    </div>
                </div>

                {model && <Modal setModel={setModel} info={card} />}

            </Link>
        </li>
    );
};

export default Card2;
