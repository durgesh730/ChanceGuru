import React from "react";
import Searchbar from "./mini_components/Searchbar";
import Topbar from "./mini_components/Topbar";
import { NavLink, useNavigate } from "react-router-dom";
import { BsChevronDown } from "react-icons/bs";
import godfather from "../assets/images/godfather.png";
import UserProfile from "./UserProfile";

const BrowseProfile = () => {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/projectcreation`;
    navigate(path);
  };
  return (
    <div>
      <Topbar />
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <Searchbar />
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
              <tr>
                <td>
                  <img src={godfather} />
                  Nick Davolt
                </td>
                <td>Lead, Supporting Actor</td>
                <td>New Jersey</td>
                <td>+1 263 3456 78</td>
                <td>
                  <NavLink to={"/browseprofile/:nickdavolt"} exact>
                    <button>View Profile</button>
                  </NavLink>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BrowseProfile;
