import React from "react";
import { useState, useEffect } from "react";
import Modal from "./Modal";
import axios from "axios";
import server from '../server';

const Card = ({ card, profile, setClicked }) => {

  const basicInfo = card.basicInfo;
  const role = card.roles;
  const create = card.createAt;
  const id = card.seekerId;

  const [model, setModel] = useState(false);
  const [roles, setroles] = useState([]);
  const [image, setImage] = useState();

  const current = new Date().toUTCString();
  var date1 = new Date(create);
  var date2 = new Date(current);
  // console.log(image);

  var Difference_In_Time = date2.getTime() - date1.getTime();
  var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  let a = Math.round(Difference_In_Days);

  const getRoles = () => {
    axios
      .get(`${server}/projects/getroles/${card.id}`)
      .then((res) => {
        setroles(res.data.data);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  const getImage = () => {
    axios
      .get(`${server}/profile/seekersImage/${id}`)
      .then((res) => {
        setImage(res.data);
      })
      .catch((err) => {
      });
  };


  useEffect(() => {
    getRoles();
    getImage();
  }, []);

  return (
    <li className="child_cards">
      <a>
        <div className="card-title">‘{basicInfo.name}’</div>
        <div className="card-desc">{basicInfo.desc}</div>
        <div className="card-author d-flex align-items-center">
          <img
            src={image?.link}
            alt=""
            style={{ width: "50px", height: "50px", objectFit: "cover" }}
          />
          <div className="d-flex flex-column mx-2">
            <div className="posted-by">Posted by</div>
            <div className="author-name">{basicInfo.company}</div>
          </div>
        </div>
        <div className="card-footer">
          <span>{role.length} Roles</span>
          <span className="mx-2">{a} days ago</span>
        </div>
        <button
          className="card-apply btn"
          onClick={() => {
            setModel(true);
            setClicked(1);
          }}
        >
          Apply
        </button>

        {model && (
          <Modal
            setModel={setModel}
            setProfile={profile}
            info={card}
            roles={role}
          />
        )}
      </a>
    </li>
  );
};

export default Card;
