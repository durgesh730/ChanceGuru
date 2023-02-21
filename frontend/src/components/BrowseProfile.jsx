import React, { useEffect, useState } from "react";
import Searchbar from "./mini_components/Searchbar";
import Topbar from "./mini_components/Topbar";
import {
  Await,
  json,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { BsChevronDown, BsPhone } from "react-icons/bs";
import godfather from "../assets/images/godfather.png";

const BrowseProfile = () => {
  const [query, setQuery] = useState("");
  const [profileData, setProfileData] = useState();
  const [searchData, setsearchData] = useState([]);

  const handleSearch = async () => {
    const data = await fetch(
      `http://localhost:5000/profile/ProData?fullname=${query}`,
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
      console.log(res);
    }
  };

  const [userData, setUserData] = useState();

  const GetProfiledata = async () => {
    const data = await fetch("http://localhost:5000/profile/profileData", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await data.json();
    console.log(res);
    if (res) {
      setProfileData(res);
    }
  };

  const GetUserData = async () => {
    const data = await fetch("http://localhost:5000/profile/Users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await data.json();
    setUserData(res);
  };

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/projectcreation`;
    navigate(path);
  };

  useEffect(() => {
    GetProfiledata();
    GetUserData();
  }, [setProfileData]);
  const location = useLocation();
  console.log(location);

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
                  <div onClick={() => setQuery(item.basicInfo.fullname)}>
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
        <div className="filter d-flex justify-content-between align-item-center">
          <p>Search Results</p>
          <button className="bg-light p-2 border-0">
            Filter
            <BsChevronDown className="mx-1" />
          </button>
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
              {profileData?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <img src={godfather} />
                      {item.basicInfo.fullname}
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
                    <td>61 502648952</td>
                    <td>
                      <NavLink
                        to={"/browseprofile/:nickdavolt"}
                        state={{ user: item, card: [], index: 0, btn: 0 }}
                        exact
                      >
                        <button>View Profile</button>
                      </NavLink>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BrowseProfile;
