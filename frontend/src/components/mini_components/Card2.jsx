import React, { useEffect } from "react";
import { useState } from "react";
import Modal from "./Modal";
import { Link } from "react-router-dom";
import axios from "axios";
import server from '../server';
import { RiAccountCircleFill } from 'react-icons/ri';

const Card2 = ({ card, index }) => {
  const [model, setModel] = useState(false);
  const name = card.basicInfo.name;
  const id = card._id;
  const [apply, setApply] = useState([]);
  var [photos, setPhotos] = useState([]);

  const handleImage = async (id) => {
    const data = await fetch(`${server}/auth/UserImageFromUserTable/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const res = await data.json();
    if (res !== null) {
      setPhotos(prev =>[...prev, res[0].link]);
    }
  };


  const getuserId = async () => {
    axios
      .get(`${server}/application/project/${id}`)
      .then((res) => {
        if (res.data !== null) {
          setApply(res.data);
          res.data.forEach(async (element) => {
            let name = await handleImage(element.userId);
          });
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
      <Link to={"/applicantdetails"} state={card._id}>
        <div className="card-title">
          ‘{name}’
          <div className=" card-author my-1">
            <span>{card.roles.length} Roles</span>
          </div>
        </div>

        <div className="card-author d-flex align-items-center justify-content-between my-3 ">
          <div className="d-flex flex-column  my-1 ">
            <div className="posted-by">Applied by</div>
            <span className="h4">{apply.length}</span>
          </div>
          <div className="many_images">
            {
              (photos[0])? <img src={photos[0]} alt="img" />:(
                <RiAccountCircleFill style={{fontSize:"1.5rem"}} />
              )
            }
             
             {
               (photos[1])?  <img src={photos[1]} alt="img" />:(
                <RiAccountCircleFill style={{fontSize:"1.5rem"}} />
               )
             }

           
            <img src={photos[2]} alt="img" />
            <span>{photos.length-3}</span>
          </div>
        </div>

        {model && <Modal setModel={setModel} info={card} />}
      </Link>
    </li>
  );
};

export default Card2;
