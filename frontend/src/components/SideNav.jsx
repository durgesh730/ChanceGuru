import React from "react";
import { NavLink } from "react-router-dom";

const SideNav = () => {
  return (
    <>
      <span>
        <NavLink
          to="/manage/submission"
          className={({ isActive }) =>
            isActive ? "lactive-class" : "not-active-class"
          }
        >
          Submission
        </NavLink>
      </span>
      <span>
        <NavLink
          to="/manage/audition"
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
