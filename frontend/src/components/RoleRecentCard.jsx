import React from "react";
import Hurray from "../assets/images/hurray.png";

const RoleRecentCard = ({ index, activeCard }) => {
  return (
    <>
      {activeCard === index + 1 && (
        <div className="d-flex">
          <div className="role_card">
            <div className="rCard_child d-flex justify-content-between align-items-center flex-column h-100 w-100">
              <figure className="hurrayDiv">
                <img src={Hurray} alt="hurray" />
              </figure>
              <p className="m-0">You have selected for a new role</p>
              <button>‘Fall in Love’</button>
              <div className="rCard_detail d-flex justify-content-between align-items-center flex-column">
                <div>
                  <p>Role</p>
                  <span>{index}</span>
                </div>

                <div>
                  <p>Role</p>
                  <span>Main role Hero</span>
                </div>
                <div>
                  <p>Role</p>
                  <span>Main role Hero</span>
                </div>
                <div>
                  <p>Role</p>
                  <span>Main role Hero</span>
                </div>
              </div>
              <h2>View Details</h2>
              <div className="rDetails_bottom">
                <figure>
                  <img src={Hurray} alt="" />
                </figure>
                <div>
                  <p>Contact Person</p>
                  <h5>Muthukumar</h5>
                  <h6>Director</h6>
                </div>
                <div>
                  <p>Contact Details</p>
                  <h5>+91 98276 88970</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RoleRecentCard;
