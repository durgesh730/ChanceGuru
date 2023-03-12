import React from 'react'
import { useEffect, useRef, useState } from "react";
import Topbar from "./mini_components/Topbar";
import { IoLogoDesignernews, IoMdNotifications } from "react-icons/io";
import Searchbar from "./mini_components/Searchbar";

import axios from "axios"
import server from "./server";

function TalentNotification() {
    const [jobs, setJobs] = useState()
    const [jobRoles, setJobRoles] = useState([])
    const [rolesNotification, setRolesNotification] = useState([])
    const [views, setViews] = useState([])
    const [viewUsers, setViewUsers] = useState([])
    const [viewsNotification,setViewNotification] = useState([])

    const dataFetchedRef = useRef(false);

    const user = JSON.parse(localStorage.getItem("login"))

    const getJobApplications = async () => {
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

        setJobs(response)
        getJobRoles(response)
    }

    function getUsers(views){
    
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

    function getJobRoles(jobs) {
        jobs?.map((job, index) => {

            axios.get(`${server}/project/getCharacter/${job.roleId}`)
                .then((res) => {
                    
                    console.log(res.data)
                    setJobRoles(oldRoles => [...oldRoles,res.data])
                    

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
            getUsers(res.data)
            
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        getJobApplications()
        getReqToApp()

    }, [])

    useEffect(()=>{
        let roles = new Set()
        jobRoles?.map((job)=>{
            job?.map((item) => {
                roles.add(`${item.roles[0].role} in ${item.basicInfo.name}`)
            })
        })
        let rolesArr = [...roles]
        rolesArr.reverse()
        setRolesNotification(rolesArr)
    },[jobRoles])

    useEffect(()=>{
        let roles = new Set()
        viewUsers?.map((view)=>{
            console.log(view)
            view?.map((item) => {
                roles.add(`${item.username}`)
            })
        })
        let viewsArr = [...roles]
        viewsArr.reverse()
        setViewNotification(viewsArr)
    },[viewUsers])

    

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
                                    <div className="d-flex align-items-center">
                                        <img src="" alt="pfp" className="me-4 shadow-sm" />
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
                                    <div className="d-flex align-items-center">
                                        <img src="" alt="pfp" className="me-4 shadow-sm" />
                                        <p>
                                            {item} has viewd your profile
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