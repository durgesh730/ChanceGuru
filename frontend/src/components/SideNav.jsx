import React from "react";
import { NavLink } from "react-router-dom";

const SideNav = () => {
  return (
    <>
      <NavLink to="/manage/submission" exact>
        <span>Submission</span>
      </NavLink>
      <NavLink to="/manage/audition" exact>
        <span>Audition</span>
      </NavLink>
    </>
  );
};

export default SideNav;
