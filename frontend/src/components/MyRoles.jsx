import React, { useState } from "react";
import Topbar from "./mini_components/Topbar";
import RoleRecentCard from "./RoleRecentCard";
import { Swiper, SwiperSlide } from "swiper/react";

const MyRoles = () => {
  const [activeCard, setActiveCard] = useState(1);
  return (
    <>
      <Topbar />
      <div className="role_main">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-8">
              <h1>My Roles</h1>
              <div className="long_Cards">
                <div className="firstDiv --1">
                  <p>Total Roles Applied</p>
                  <h3>45</h3>
                </div>
                <div className="c--2">
                  <span>
                    <p>Selected for Audition</p>
                    <h3>10</h3>
                  </span>
                </div>
                <div className="c--3">
                  <span>
                    <p>Waiting List</p>
                    <h3>02</h3>
                  </span>
                </div>
                <div className="c--4">
                  <span>
                    <p>Not Selected</p>
                    <h3>08</h3>
                  </span>
                </div>
                <div className="c--5">
                  <span className="border-0">
                    <p>Not Selected</p>
                    <h3>08</h3>
                  </span>
                </div>
              </div>

              <div className="long_Cards">
                <div className="firstDiv --2">
                  <p>Total Roles Applied</p>
                  <h3>45</h3>
                </div>

                <div>
                  <span>
                    <p>Total Roles Applied</p>
                    <h3>45</h3>
                  </span>
                </div>
                <div>
                  <span>
                    <p>Total Roles Applied</p>
                    <h3>45</h3>
                  </span>
                </div>
                <div>
                  <span className="border-0">
                    <p>Total Roles Applied</p>
                    <h3>45</h3>
                  </span>
                </div>
              </div>

              <div className="long_Cards">
                <div className="firstDiv --3">
                  <p>Total Roles Applied</p>
                  <h3>45</h3>
                </div>
                <div>
                  <span>
                    <p>Total Roles Applied</p>
                    <h3>45</h3>
                  </span>
                </div>
                <div>
                  <span>
                    <p>Total Roles Applied</p>
                    <h3>45</h3>
                  </span>
                </div>
                <div>
                  <span className="border-0">
                    <p>Total Roles Applied</p>
                    <h3>45</h3>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 recent_main">
              <h1>Recents</h1>

              {Array.from({ length: 3 }).map((item, index) => (
                <RoleRecentCard index={index} activeCard={activeCard} />
              ))}
              <div className="d-flex justify-content-center align-items-center">
                {Array.from({ length: 3 }).map((item, index) => (
                  <div
                    className={
                      activeCard === index + 1 ? "dot dot_active" : "dot"
                    }
                    onClick={() => setActiveCard(index + 1)}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyRoles;
