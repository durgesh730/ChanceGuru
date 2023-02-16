import React, { useEffect, useState } from "react";
import Topbar from "./mini_components/Topbar";
import { IoMdNotifications } from "react-icons/io";
import Searchbar from "./mini_components/Searchbar";

const Notification = () => {
  const [projects, setProjects] = useState()
  const getProjects = async () => {
    const res = await fetch(
      "http://localhost:5000/project/allProjectsSeekers",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const response = await res.json();

    if (response !== null) {
      setProjects(response);
    }
  }

  useEffect(() => {
    getProjects()
  })
  return (
    <>
      <Topbar />
      <div className="notification p-5">
        <div className="p-4 shadow">
          <div>
            <h1 style={{ color: "#8443e5" }}>
              Notifications <IoMdNotifications />{" "}
            </h1>
          </div>
          <Searchbar />
          <hr />
          {
            projects?.map((project, index) => {
              return (
                <div className="d-flex align-items-center">
                  <img src="" alt="pfp" className="me-4 shadow-sm" />
                  <p>
                    You have successfully created the project {project.basicInfo.name}
                  </p>
                </div>
              )
            })
          }
          {/* <div className="d-flex align-items-center">
            <img src="" alt="pfp" className="me-4 shadow-sm" />
            <p>
              You have successfully created the project "Shakespeare's Macbeth"
            </p>
          </div>
          <hr />
          <div className="d-flex">
            <img src="" alt="pfp" className="me-4 shadow-sm" />
            <p>
              You have successfully created the project "Shakespeare's Macbeth"
            </p>
          </div>
          <hr />

          <div className="d-flex">
            <img src="" alt="pfp" className="me-4 shadow-sm" />
            <p>
              You have successfully created the project "Shakespeare's Macbeth"
            </p>
          </div>
          <hr />

          <div className="d-flex">
            <img src="" alt="pfp" className="me-4 shadow-sm" />
            <p>
              You have successfully created the project "Shakespeare's Macbeth"
            </p>
          </div>
          <hr />

          <div className="d-flex">
            <img src="" alt="pfp" className="me-4 shadow-sm" />
            <p>
              You have successfully created the project "Shakespeare's Macbeth"
            </p>
          </div>
          <hr />

          <div className="d-flex">
            <img src="" alt="pfp" className="me-4 shadow-sm" />
            <p>
              You have successfully created the project "Shakespeare's Macbeth"
            </p>
          </div>
          <hr />

          <div className="d-flex">
            <img src="" alt="pfp" className="me-4 shadow-sm" />
            <p>
              You have successfully created the project "Shakespeare's Macbeth"
            </p>
          </div>
          <hr />

          <div className="d-flex">
            <img src="" alt="pfp" className="me-4 shadow-sm" />
            <p>
              You have successfully created the project "Shakespeare's Macbeth"
            </p>
          </div>
          <hr />

          <div className="d-flex">
            <img src="" alt="pfp" className="me-4 shadow-sm" />
            <p>
              You have successfully created the project "Shakespeare's Macbeth"
            </p>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Notification;
