import React from "react";
import { NavLink } from "react-router-dom";

const SideNav = () => {
  return (
    <>
      <span className="mb-3">
        <NavLink
          to="/submission"
          className={({ isActive }) =>
            isActive ? "lactive-class" : "not-active-class"
          }
        >
          Submission
        </NavLink>
      </span>
      <span>
        <NavLink
          to="/audition"
          className={({ isActive }) =>
            isActive ? "lactive-class" : "not-active-class"
          }
        >
          Audition
        </NavLink>
      </span>
    </>
  );
};

export default SideNav;
