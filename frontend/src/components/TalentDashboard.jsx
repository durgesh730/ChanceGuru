import React, { useState, useEffect, useContext } from "react";
import Topbar from "./mini_components/Topbar";
import Searchbar from "./mini_components/Searchbar";
import Card from "./mini_components/Card";
import axios from "axios";
import { AiFillCheckCircle } from "react-icons/ai";
import cardImg from "../assets/images/rectangle-13.png";
import AuthContext from "./AuthContext";

const TalentDashboard = () => {
  const auth = useContext(AuthContext);
  const [cards, setcards] = useState([]);
  console.log(cards);
  const getProjects = () => {
    axios
      .get("http://localhost:5000/project/allProjects")
      .then((res) => {
        setcards(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProjects();
  }, []);

  const changedState = () => {
    console.log("parent side");
  };

  return (
    <>
      <Topbar />
      <div className="container-fluid" style={{ padding: "0 60px" }}>
        <Searchbar />
        <div className="talent-heading d-flex justify-content-between">
          <div className="">Suggestions</div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <ul className="grid-wrapper">
              {cards?.map((card) => (
                <Card card={card} setClicked={auth.setClicked} />
              ))}{" "}
              <li
                className="side_div"
                style={auth.clicked ? {} : { display: "none" }}
              >
                <div className="sd_1">
                  <div className="sd_upper d-flex justify-content-center align-items-center flex-column mb-3">
                    <img src={cardImg} alt="" />
                    <p>Arunvignesh</p>
                    <div>
                      <h6>Profile Strength :</h6>
                      <span>Awesome</span>
                    </div>
                    <div className="line"></div>
                  </div>
                  <div className="sd_lower">
                    <div>
                      <p>Add Profile Details</p>
                      <span>
                        <AiFillCheckCircle />
                        <p>100%</p>
                      </span>
                    </div>
                    <div>
                      <p>Add Profile Details</p>
                      <span>
                        <AiFillCheckCircle />
                        <p>100%</p>
                      </span>
                    </div>
                    <div>
                      <p>Add Profile Details</p>
                      <span>
                        <AiFillCheckCircle />
                        <p>100%</p>
                      </span>
                    </div>
                    <div>
                      <p>Add Profile Details</p>
                      <span>
                        <AiFillCheckCircle />
                        <p>100%</p>
                      </span>
                    </div>
                    <div>
                      <p>Add Profile Details</p>
                      <span>
                        <AiFillCheckCircle />
                        <p>100%</p>
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="loadmore">
          <button className="btn">Load More</button>
        </div>
      </div>
    </>
  );
};

export default TalentDashboard;
