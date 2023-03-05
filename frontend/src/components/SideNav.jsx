import React from "react";
import { NavLink } from "react-router-dom";

const SideNav = () => {
  return (
    <>
      <p className="sidebar-items mt-2">
        <NavLink
          to="/submission"
          className={({ isActive }) =>
            isActive ? "lactive-class" : "not-active-class"
          }
        >
          Submission
        </NavLink>
      </p>
      <p className="sidebar-items">
        <NavLink
          to="/audition"
          className={({ isActive }) =>
            isActive ? "lactive-class" : "not-active-class"
          }
        >
          Audition
        </NavLink>
      </p>
    </>
  );
};

export default SideNav;
