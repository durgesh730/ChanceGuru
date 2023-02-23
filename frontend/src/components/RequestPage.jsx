import React from "react";
import { NavLink } from "react-router-dom";
import Topbar from "./mini_components/Topbar";

const RequestPage = () => {
  return (
    <>
      <Topbar />

      <div className="requestPage d-flex justify-content-center">
        <div className="b_table mt-5">
          <table>
            <thead>
              <td>Request ID</td>
              <td>Seeker Name</td>
              <td>Time</td>
              <td></td>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mandar</td>
                <td>14-02-2023</td>
                <td>
                  <NavLink to="">
                    <button>View Profile</button>
                  </NavLink>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Ashutosh</td>
                <td>14-02-2050</td>
                <td>
                  <NavLink to="">
                    <button>View Profile</button>
                  </NavLink>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default RequestPage;
