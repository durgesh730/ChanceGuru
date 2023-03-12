import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Topbar from "./mini_components/Topbar";
import axios from "axios"
import server from "./server";

const RequestPage = () => {
  const [requests, setRequests] = useState([])
  const [reqUsers, setReqUsers] = useState([])
  const [reqUserMap, setReqUserMap] = useState([])
  const user = JSON.parse(localStorage.getItem("login"))

  function getUsers(applyReqs) {

    applyReqs?.map((item, index) => {
      axios
        .get(`${server}/auth/seeker/${item.seekerId}`)
        .then((res) => {
          if (res !== null) {
            setReqUsers(oldUsers => [...oldUsers, res.data])
          }
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err);
        })

    })
  }

  const getAllRequests = () => {
    axios.get(`${server}/profile/getRequests/${user._id}`)
      .then((res) => {
        console.log(res.data)
        if (res.data.length != 0) {
          setRequests(res.data)
          getUsers(res.data)
        }

      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (reqUsers.length == 0 || requests.length == 0) {
      return
    }
    let len = reqUsers.length === requests.length ? reqUsers.length : 0;
    let arr = []
    for (let index = 0; index < len; index++) {

      const seekerName = reqUsers[index].username;
      const seekerId = reqUsers[index]._id;
      let requestTime = new Date(requests[index].RequestSendAt);
      console.log(typeof (requestTime))
      requestTime = `${requestTime.getDate()}-${requestTime.getMonth() + 1 < 10 ? `0${requestTime.getMonth() + 1}` : requestTime.getMonth()}-${requestTime.getFullYear()}`
      let mapObj = {
        seeker: seekerName,
        requestTime: requestTime,
        seekerId:seekerId
      }
      arr.push(mapObj)

    }
    console.log(arr)
    if (arr.length != 0) {

      setReqUserMap(arr)
    }

  }, [requests, reqUsers])

  useEffect(() => {
    getAllRequests()
  }, [])

  console.log(reqUserMap)

  return (
    <>
      <Topbar />

      <div className="requestPage d-flex justify-content-center">
        <div className="b_table mt-5">
          {
            reqUserMap.length > 0 ? (
              <table>
                <thead>
                  <td>Request ID</td>
                  <td>Seeker Name</td>
                  <td>Time</td>
                  <td></td>
                </thead>
                <tbody>
                  {
                    reqUserMap?.map((item, index) => {
                      return (

                        <tr>
                          <td>{index + 1}</td>
                          <td>{item.seeker}</td>
                          <td>{item.requestTime}</td>
                          <td>
                            <NavLink to={`/talentdashboard`} state={{seekerId:item.seekerId}} exact>
                              <button>View Projects</button>
                            </NavLink>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            )
              : "You currently have no requests"
          }

        </div>
      </div>
    </>
  );
};

export default RequestPage;
