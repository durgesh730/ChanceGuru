import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Topbar from "./mini_components/Topbar";
import axios from "axios"
const RequestPage = () => {
  const [requests, setRequests] = useState([])
  const [reqUsers, setReqUsers] = useState([])
  const [reqUserMap, setReqUserMap] = useState([])
  const user = JSON.parse(localStorage.getItem("login"))

  function getUsers(applyReqs) {

    applyReqs?.map((item, index) => {
      axios
        .get(`http://localhost:5000/profile/profileData?id=${item.seekerId}`)
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
    axios.get(`http://localhost:5000/profile/getRequests/${user._id}`)
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

      const seekerName = reqUsers[index][0].basicInfo.fullname;
      let requestTime = new Date(requests[index].RequestSendAt);
      console.log(typeof (requestTime))
      requestTime = `${requestTime.getDate()}-${requestTime.getMonth() + 1 < 10 ? `0${requestTime.getMonth() + 1}` : requestTime.getMonth()}-${requestTime.getFullYear()}`
      let mapObj = {
        seeker: seekerName,
        requestTime: requestTime
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
                            <NavLink to={"/browseprofile/:nickdavolt"} state={{ user: item, card: [], index: 0, btn: 0 }} exact>
                              <button>View Profile</button>
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
