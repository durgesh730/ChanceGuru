import React from "react";
import Topbar from "./mini_components/Topbar";
import SideNav from "./SideNav";

const ManageProfile = () => {
  return (
    <>
      <Topbar />
      <div className="container-fluid p-0">
        <div className="row">
          <div className="side_nav col-lg-2">
            <SideNav />
          </div>
          <div className="col-lg-10 d-flex justify-content-center align-items-center">
            Manage Profiles
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageProfile;
