import React, { useState } from "react";
import Searchbar from "./mini_components/Searchbar";
import Topbar from "./mini_components/Topbar";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import godfather from "../assets/images/godfather.png";
import { NavLink, useLocation } from "react-router-dom";
import SideNav from "./SideNav";

const Audition = () => {
  const [active, setActive] = useState(false);
  const location = useLocation();
  return (
    <>
      <Topbar />
      <div className="container-fluid p-0">
        <div className="row">
          <div className="side_nav col-lg-2">
            <SideNav />
          </div>
          <div className="col-lg-10">
            <div className="px-4">
              <Searchbar />
              <h5 className="purple_title">Projects</h5>
              <div className="audition_accordion">
                <div className="aa1 border p-2">
                  <div className="aa_head d-flex justify-content-between">
                    <p>Shakespeare's Macbeth</p>
                    <div>
                      <span>Roles : </span>
                      <span>03</span>
                    </div>
                    <div>
                      <span>Character : </span>
                      <span>06</span>
                    </div>
                    <div className="aa_icon">
                      {active ? (
                        <BsChevronUp onClick={() => setActive(!active)} />
                      ) : (
                        <BsChevronDown onClick={() => setActive(!active)} />
                      )}
                    </div>
                  </div>
                  {active && (
                    <div className="aa_body">
                      <hr />
                      <div className="b_table">
                        <table>
                          <thead>
                            <td>Applocant Name</td>
                            <td>Auditioned For</td>
                            <td>Status</td>
                            <td></td>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <img src={godfather} />
                                Nick Davolt
                              </td>
                              <td>Malcolm, Lead</td>
                              <td>Scheduled</td>
                              <td>
                                <div className="d-flex justify-content-center align-items-center">
                                  <NavLink
                                    to="/browseprofile/:nickdavolt"
                                    state={{
                                      audition_location: location.pathname,
                                    }}
                                    exact
                                  >
                                    <button>View Profile</button>
                                  </NavLink>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Audition;
