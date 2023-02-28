import React, { useEffect } from "react";
import { useState } from "react";
import Modal from "./Modal";
import { Link } from "react-router-dom";
import axios from "axios";

const Card2 = ({ card }) => {
  const [model, setModel] = useState(false);
  const name = card.basicInfo.name;
  const id = card._id;

 var str = card.createAt;
 let result = str?.slice(4, 15);

  const [apply, setApply] = useState([]);

  const getuserId = () => {
    axios
      .get(`http://localhost:5000/application/project/${id}`)
      .then((res) => {
        if (res.data !== null) {
          setApply(res.data);
          // console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getuserId();
  }, []);

  return (
    <li className="child_cards">
      <Link to={"/roles"} state={card}>
        <div className="card-title">‘{name}’</div>
        <div className="card-author d-flex align-items-center  h-75">
          <div className="d-flex flex-column  mx-2  justify-content-between h-100">
            {/* <div className="posted-by">Applied by</div> */}
            <span>{apply.length} Roles</span>
            <div className="card_date">
              <h6>Posted On</h6>
              <p>{result?(result):"Not available"}</p>
            </div>
          </div>

          <button className="btn btn-outline-primary" >Durgesh</button>
        </div>

        {model && <Modal setModel={setModel} info={card} />}
      </Link>
    </li>
  );
};

export default Card2;
