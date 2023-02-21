import React, { useEffect, useRef, useState } from "react";
import Topbar from "./mini_components/Topbar";
import { IoLogoDesignernews, IoMdNotifications } from "react-icons/io";
import Searchbar from "./mini_components/Searchbar";

import axios from "axios"



const Notification = () => {
  const [projects, setProjects] = useState()
  const [jobs, setJobs] = useState()
  const [jobProjects, setJobProjects] = useState([])
  const [jobUsers, setJobUsers] = useState([])

  const dataFetchedRef = useRef(false);
  const [userProjectMap,setUserProjectMap] = useState([]);

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

  const getJobApplications = async () => {
    const res = await fetch(
      "http://localhost:5000/application/allJobsSeeker",
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

  function getUsers(jobs){
    
    jobs?.map((job, index) => {
      axios
        .get(`http://localhost:5000/project/UserId/${job.userId}`)
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

  function getJobProjects(jobs){
    jobs?.map((job, index) => {

      axios.get(`http://localhost:5000/project/projectDetails/${job.pId}`)
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
  
  useEffect(()=>{
    if(jobUsers.length == 0 || jobProjects.length == 0){
      return
    }
    let len = jobProjects.length === jobUsers.length ? jobProjects.length:0;
    let arr = new Set()
    for (let index = 0; index < len; index++) {
      
      const userName = jobUsers[index][0].username;
      const projectName = jobProjects[index][0].basicInfo.name;
      let mapObj = {
        user:userName,
        project:projectName 
      }
     arr.add(`${mapObj.user} has applied to project ${mapObj.project}`)
      
    }
    console.log(arr)
    setUserProjectMap([...arr])
    
  },[jobUsers,jobProjects])
  
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
                <>
                  <div className="d-flex align-items-center">
                    <img src="" alt="pfp" className="me-4 shadow-sm" />
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
            userProjectMap?.map((item)=>{
              return(
                <>
                  <div className="d-flex align-items-center">
                    <img src="" alt="pfp" className="me-4 shadow-sm" />
                    <p>
                      {item}
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
