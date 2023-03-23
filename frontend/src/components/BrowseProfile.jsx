import React, { useEffect, useState } from "react";
import Searchbar from "./mini_components/Searchbar";
import Topbar from "./mini_components/Topbar";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { BsChevronDown, BsPhone } from "react-icons/bs";

import axios from "axios";
import Contect from "./Contect";
import server from "./server";
import Images from "./Images";

const BrowseProfile = () => {
  const [query, setQuery] = useState("");
  const [profileData, setProfileData] = useState();
  const [select, setSelect] = useState("");
  const [searchData, setsearchData] = useState([]);
  const location = useLocation();
  const [skills, setSkills] = useState();
  const [roles, setRoles] = useState();

  const setGet = (e) => {
    const { name, value } = e.target;

    setSelect(() => {
      return {
        ...select,
        [name]: value,
      };
    });
  };

  const handleSelect = async () => {
    const data = await fetch(
      `${server}/profile/SelectData?role=${select.select}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const res = await data.json();
    if (res) {
      setProfileData(res);
    }
  };

 

  const handleSearch = async () => {
    const data = await fetch(
      `${server}/profile/ProData?fullname=${query}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const res = await data.json();
    if (res) {
      setProfileData(res);
    }
  };
  useEffect(() => {
    handleSearch();
  }, [query])


  const getuserData = () => {
    axios
      .get(`${server}/admin/roles`)
      .then((res) => {
        if (res !== null) {
          setRoles(res.data)
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const getuserSkills = () => {
    axios
      .get(`${server}/admin/skills`)
      .then((res) => {
        if (res !== null) {
          setSkills(res.data)
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const GetProfiledata = async () => {
    const data = await fetch("${server}/profile/profileData", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await data.json();
    setsearchData(res);
    if (res) {
      setProfileData(res);
    }
  };

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/projectcreation`;
    navigate(path);
  };

  useEffect(() => {
    GetProfiledata();
    getuserData();
    getuserSkills();
  }, []);

  function viewProfileClicked(item) {
    console.log(item)

    axios.post(`${server}/profile/ReqToApp`, { talentId: item.userId }, {

      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },

    })
      .then(res => {
        console.log(res.data);

      })
      .catch(err => {
        console.log(err);
      });
  }
  return (
    <div>
      <Topbar />
      <div className="container">
        <div className="row">
          <div className="searchBox col-lg-8">
            <Searchbar
              setQuery={setQuery}
              query={query}
              handleSearch={handleSearch}
            />
            <div
              className="searchDropdown"
              style={query === "" ? { border: "none" } : {}}
            >
              {searchData
                .filter((item, index) => {
                  const searchTerm = query.toLowerCase();
                  const name = item.basicInfo.fullname.toLowerCase();
                  return searchTerm && name.startsWith(searchTerm);
                })
                .map((item, index) => (
                  <div onClick={() => { setQuery(item.basicInfo.fullname) }}>
                    {item.basicInfo.fullname}
                  </div>
                ))}
            </div>
          </div>
          <div className="col-lg-4">
            <button
              className="btn btn-primary create-btn"
              onClick={routeChange}
            >
              Create New Project
            </button>
          </div>
        </div>

        <div className="filter d-flex justify-content-between align-item-center  ">
          <p>Search Results</p>
          <select
            value={select.select}
            name="select"
            className="bg-light p-1 border-0"
            onClick={handleSelect}
            onChange={setGet}
          >
            <option selected>Filter</option>
            {
              roles?.map((item) => {
                return (
                  <option>{item.role}</option>
                )
              })
            }

            {
              skills?.map((item) => {
                return (
                  <option>{item.skill}</option>
                )
              })
            }
          </select>
        </div>

        <div className="b_table">
          <table>
            <thead>
              <td>Talents</td>
              <td>Roles Intrested</td>
              <td>Location</td>
              <td>Contact</td>
            </thead>
            <tbody>
              {
                profileData?.length === 0 || profileData === undefined ? (
                  <div class="loader"></div>
                ) : (
                  profileData?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="d-flex justify-content-start align-items-center">
                          <Images item={item} />
                          <p>{item.basicInfo.fullname}</p>
                        </td>
                        <td>
                          {item.rolePref.length !== 0
                            ? item.rolePref?.map((i) => {
                              return (
                                <>
                                  <span>{i.role}</span>
                                  <br />
                                </>
                              );
                            })
                            : "No role preferences found"}
                        </td>
                        <td>
                          {" "}
                          {item.basicInfo.address
                            ? item.basicInfo.address
                            : "No address"}{" "}
                        </td>
                        <td> <Contect index={index} userId={item.userId} /> </td>
                        <td>
                          <NavLink
                            to={"/browseprofile/:nickdavolt"}
                            state={{ user: item, card: [], index: 0, btn: 0 }}
                            onClick={() => viewProfileClicked(item)}
                            exact
                          >
                            <button>View Profile</button>
                          </NavLink>
                        </td>
                      </tr>
                    );
                  })
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BrowseProfile;
