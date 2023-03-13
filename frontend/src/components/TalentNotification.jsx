import React from 'react'
import { useEffect, useRef, useState } from "react";
import Topbar from "./mini_components/Topbar";
import { IoLogoDesignernews, IoMdNotifications } from "react-icons/io";
import Searchbar from "./mini_components/Searchbar";

import axios from "axios"
import server from "./server";

function TalentNotification() {
    const [jobsTalent, setJobsTalent] = useState([])
    const [jobRolesTalent, setJobRolesTalent] = useState([])
    const [rolesNotification, setRolesNotification] = useState([])
    const [views, setViews] = useState([])
    const [viewUsers, setViewUsers] = useState([])
    const [viewsNotification,setViewNotification] = useState([])
  const [loggedUser, setLoggedUser] = useState("");


    const dataFetchedRefTalent = useRef(false);

    const user = JSON.parse(localStorage.getItem("login"))

    const getJobApplicationsTalent = async () => {
        const res = await fetch(
            `${server}/application/allJobsUser`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        
        const response = await res.json();
        console.log(response)

        setJobsTalent(response)
        getJobRolesTalent(response)
    }

    function getUsersTalent(views){
    
        views?.map((view, index) => {
            console.log(view)
          axios
            .get(`${server}/project/UserId/${view.seekerId}`)
            .then((res) => {
              if (res !== null) {
                setViewUsers(oldUsers => [...oldUsers, res.data])
              }
              // console.log(res.data)
            })
            .catch((err) => {
              console.log(err);
            })
    
        })
      }

    function getJobRolesTalent(jobsTalent) {
        jobsTalent?.map((job, index) => {

            axios.get(`${server}/project/getCharacter/${job.roleId}`)
                .then((res) => {
                    
                    console.log(res.data)
                    setJobRolesTalent(oldRoles => [...oldRoles,res.data])
                    

                })
                .catch((err) => {
                    console.log(err);
                })
        })
    }

    const getReqToApp = ()=>{
        axios.get(`${server}/profile/reqToApp/${user._id}`)
        .then((res)=>{
            console.log(res.data)
            setViews(res.data)
            getUsersTalent(res.data)
            
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    useEffect(() => {
        if (dataFetchedRefTalent.current) return;
        dataFetchedRefTalent.current = true;
        getJobApplicationsTalent()
        getReqToApp()

    }, [])

    useEffect(()=>{
        let roles = new Set()
        jobRolesTalent?.map((job)=>{
            job?.map((item) => {
                roles.add(`${item.roles[0].role} in ${item.basicInfo.name}`)
            })
        })
        let rolesArr = [...roles]
        rolesArr.reverse()
        setRolesNotification(rolesArr)
    },[jobRolesTalent])

    useEffect(()=>{
        let roles = new Set()
        viewUsers?.map((view)=>{
            console.log(view)
            view?.map((item) => {
                roles.add({"notification":item.username,"img":item.link})
            })
        })
        let viewsArr = [...roles]
        viewsArr.reverse()
        setViewNotification(viewsArr)
    },[viewUsers])

    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem("login")));
      }, []);

      console.log("count noti",rolesNotification.length)

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
                        rolesNotification?.map((roleName, index) => {
                            return (
                                <>
                                    <div className="notificationDiv d-flex align-items-center">
                                        <img src={loggedUser.link} alt="pfp" className="me-4 shadow-sm" />
                                        <p>
                                            You have successfully applied for the role {roleName}
                                        </p>
                                    </div>
                                    <hr />
                                </>
                            )
                        })
                    }
                    {
                        viewsNotification?.map((item) => {
                            return (
                                <>
                                    <div className="notificationDiv d-flex align-items-center">
                                        <img src={item.img} alt="pfp" className="me-4 shadow-sm" />
                                        <p>
                                            {item.notification} has viewed your profile
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
    )
}

export default TalentNotification