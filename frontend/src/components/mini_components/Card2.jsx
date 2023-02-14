import React, { useEffect } from "react";
import { useState } from "react";
import Modal from "./Modal";
import { Link } from "react-router-dom";
import image from "../../assets/images/godfather.png";
import axios from "axios";

const Card2 = ({ card }) => {
  const [model, setModel] = useState(false);
  const name = card.basicInfo.name;
  const id = card._id

  const [apply, setApply] = useState([]);

  const getuserId = () => {
    axios
      .get(`http://localhost:5000/application/project/${id}`)
      .then((res) => {
        if(res.data !== null){
          setApply(res.data)
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
    <li className="child_cards">
      <Link to={"/applicantdetails"} state={card._id}>
        <div className="card-title">
          ‘{name}’
          <div className=" card-author my-1">
            <span>{card.roles.length}  Roles</span>
          </div>
        </div>

        <div className="card-author d-flex align-items-center justify-content-between my-3 ">
          <div className="d-flex flex-column  my-1 ">
            <div className="posted-by">Applied by</div>
            <span className="h4" >{apply.length}</span>
          </div>
          <div className="many_images">
            <img src={image} alt="img" />
            <img src={image} alt="img" />
            <img src={image} alt="img" />
            <span>+20</span>
          </div>
        </div>

        {model && <Modal setModel={setModel} info={card} />}
      </Link>
    </li>
  );
};

export default Card2;
