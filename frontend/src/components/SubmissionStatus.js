import React, { useEffect, useState } from "react";
import SubViewProfile from "./SubViewProfile";
import axios from "axios";
import StatusSide from "./StatusSide";

const SubmissionStatus = ({ id }) => {
  const [cards, setcards] = useState();
  const getuserId = () => {
    axios
      .get(`http://localhost:5000/project/Seekers/${id}`)
      .then((res) => {
        setcards(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getuserId();
  }, []);

  const [active, setActive] = useState("1");
  const [btnActive, setBtnActive] = useState("1");

  return (
    <>
      <div className="aa_body">
        <hr />
        <div className="horizontal_nav w-50 d-flex justify-content-between">
          <span
            className={active === "1" ? "activeUser-class" : ""}
            onClick={() => setActive("1")}
          >
            Lead
          </span>
          <span
            className={active === "2" ? "activeUser-class" : ""}
            onClick={() => setActive("2")}
          >
            Supporting Actor
          </span>
          <span
            className={active === "3" ? "activeUser-class" : ""}
            onClick={() => setActive("3")}
          >
            Chorus/Ensemble
          </span>
        </div>
        <hr className="mt-0" />
        <div className="sub_nav d-flex justify-content-start">
          <button
            className={btnActive === "1" ? "active_btn" : ""}
            onClick={() => setBtnActive("1")}
          >
            Malcom
          </button>
          <button
            className={btnActive === "2" ? "active_btn" : ""}
            onClick={() => setBtnActive("2")}
          >
            MacDuff
          </button>
          <button
            className={btnActive === "3" ? "active_btn" : ""}
            onClick={() => setBtnActive("3")}
          >
            Lady MacDuff
          </button>
        </div>
        <hr />
        <div className="b_table">
          <table>
            <thead>
              <td>Applocant Name</td>
              <td>Auditioned For</td>
              <td>Status</td>
              <td></td>
            </thead>
            <tbody>
              {cards?.map((item, index) => {
                // console.log(item._id)
                return (
                  <>
                    <tr>
                      <StatusSide userId={item.userId} />
                      <td>{item.status}</td>
                      <SubViewProfile
                        display={"/submission"}
                        index={index}
                        card={cards}
                        msg={"View Profile"}
                      />
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default SubmissionStatus;
