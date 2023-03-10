import React, { useEffect, useRef, useState } from "react";
import Topbar from "./mini_components/Topbar";
import { IoLogoDesignernews, IoMdNotifications } from "react-icons/io";
import Searchbar from "./mini_components/Searchbar";
import profile from "../assets/icons/profile1.svg";
import axios from "axios"
import server from "./server";

const Notification = () => {
  const [projects, setProjects] = useState()
  const [jobs, setJobs] = useState()
  const [jobProjects, setJobProjects] = useState([])
  const [jobUsers, setJobUsers] = useState([])

  const dataFetchedRef = useRef(false);
  const [userProjectMap, setUserProjectMap] = useState([]);
  const [loggedUser, setLoggedUser] = useState("");


  const getProjects = async () => {
    const res = await fetch(
      `${server}/project/allProjectsSeekers`,
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

  const getJobApplications = async () => {
    const res = await fetch(
      `${server}/application/allJobsSeeker`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const response = await res.json();

    setJobs(response)

    getUsers(response)
    getJobProjects(response)

  }

  function getUsers(jobs) {

    jobs?.map((job, index) => {
      axios
        .get(`${server}/project/UserId/${job.userId}`)
        .then((res) => {
          if (res !== null) {
            setJobUsers(oldUsers => [...oldUsers, res.data])
          }
          // console.log(res.data)
        })
        .catch((err) => {
          console.log(err);
        })

    })
  }

  function getJobProjects(jobs) {
    jobs?.map((job, index) => {

      axios.get(`${server}/project/projectDetails/${job.pId}`)
        .then((res) => {
          if (res !== null) {
            setJobProjects(oldProjects => [...oldProjects, res.data])
          }
          // console.log(res.data)
        })
        .catch((err) => {
          console.log(err);
        })
    })
  }

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    getProjects()
    getJobApplications()
  }, [])

  useEffect(() => {
    if (jobUsers.length == 0 || jobProjects.length == 0) {
      return
    }
    let len = jobProjects.length === jobUsers.length ? jobProjects.length : 0;
    let arr = new Set()
    let imgArr = new Set()

    for (let index = 0; index < len; index++) {

      const userName = jobUsers[index][0].username;
      const projectName = jobProjects[index][0].basicInfo.name;
      const image = jobUsers[index][0].link;

      let mapObj = {
        user: userName,
        project: projectName,
      }
      arr.add({ notification: `${mapObj.user} has applied to project ${mapObj.project}`, img: image })
    }
    console.log(arr)
    setUserProjectMap([...arr])

  }, [jobUsers, jobProjects])

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("login")));
  }, []);

  console.log("userProjectMap", jobUsers)

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

          {/* project.reverse()?.map */}

          {
            projects?.reverse().map((project, index) => {
              return (
                <>
                  <div className="notificationDiv  d-flex align-items-center">
                    <img src={loggedUser.link === undefined ? profile : loggedUser.link} alt="pfp" className="me-4 shadow-sm" />
                    <p>
                      You have successfully created the project {project.basicInfo.name}
                    </p>
                  </div>
                  <hr />
                </>
              )
            })
          }
          {
            userProjectMap?.reverse().map((item) => {
              return (
                <>
                  <div className="notificationDiv d-flex align-items-center">
                    <img src={item.img === undefined ? profile : item.img} alt="pfp" className="me-4 shadow-sm" />
                    <p>
                      {item.notification}
                    </p>
                  </div>
                  <hr />
                </>
              )
            })
          }
        </div>
      </div>
    </>
  );
};

export default Notification;
