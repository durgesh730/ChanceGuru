import React, { useState , useEffect } from "react";
import Topbar from "./mini_components/Topbar";
import RoleRecentCard from "./RoleRecentCard";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";

const MyRoles = () => {
  const [activeCard, setActiveCard] = useState(1);
  const [totalApplied, settotalApplied] = useState(0);
  const [directSelect, setdirectSelect] = useState(0);
  const [directScheduled, setdirectScheduled] = useState(0);
  const [firstWaiting, setfirstWaiting] = useState(0);
  const [preaudition, setpreaudition] = useState(0)
  const [firstreject, setfirstreject] = useState(0);
  const [secondreject, setsecondreject] = useState(0);
  const [shortlisted, setshortlisted] = useState(0);
  const [secondselect, setsecondselect] = useState(0);
  const [secondAudition, setsecondAudition] = useState(0);
  const [thirdSelect, setthirdSelect] = useState(0);
  const [scheduled, setscheduled] = useState(0);
  const [thirdReject, setthirdReject] = useState(0);

  const getApplications = () => {
    axios.
      get("http://localhost:5000/application/allJobsUser" , {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) =>  {
        console.log(res.data)
        settotalApplied(res.data.length);
        (res.data).forEach(item => {

          if(item.value == 10){
            setdirectSelect(directSelect + 1);
          }

          if(item.value == 1005 || item.value == 1004 || item.value == 1105){
            setdirectScheduled((prev) => prev + 1);
          }

          if(item.value == 5){
            setfirstWaiting((prev) => prev + 1);
          }
          let a = [105 , 104 , 205 , 605 , 604 , 705 ]
          if(a.includes(item.value)){
            setpreaudition((prev) => prev + 1);
          }

          if(item.value == 4){
            setfirstreject((prev) => prev + 1);
          }

          if(item.value == 104){
            setsecondreject((prev) => prev + 1);  
          }

          if(item.value == 105){
            setshortlisted((prev) => prev + 1);
          }

          if(item.value == 205){
            setsecondselect((prev) => prev + 1);
          }

          if(item.value == 605 || item.value == 604 || item.value == 705 ){
            setsecondAudition((prev) => prev + 1)
          }

          if(item.value == 705 || item.select == 1105){
            setthirdSelect((prev) => prev + 1)
          }

          if(item.value == 605 || item.value == 1005){
            setscheduled((prev) => prev + 1);
          }

          if(item.value == 604 || item.value == 1004){
            setthirdReject((prev) => prev + 1);
          }
        })
      })
      .catch((err)=> {
        console.log(err);
      })
  }

  useEffect(() => {
    getApplications();
  }, [])
  
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
                  <h3>{totalApplied}</h3>
                </div>
                <div className="c--2">
                  <span>
                    <p>Selected</p>
                    <h3>{directSelect}</h3>
                  </span>
                </div>
                <div className="c--2">
                  <span>
                    <p>Selected for Audition</p>
                    <h3>{directScheduled}</h3>
                  </span>
                </div>
                <div className="c--3">
                  <span>
                    <p>Selected for Pre- Audition</p>
                    <h3>{preaudition}</h3>
                  </span>
                </div>
                <div className="c--3">
                  <span>
                    <p>Waiting List</p>
                    <h3>{firstWaiting}</h3>
                  </span>
                </div>
                <div className="c--4">
                  <span>
                    <p>Not Selected</p>
                    <h3>{firstreject}</h3>
                  </span>
                </div>
              </div>

              <div className="long_Cards">
                <div className="firstDiv --2">
                  <p>Total Pre-Auditions</p>
                  <h3>{preaudition}</h3>
                </div>

                <div>
                  <span>
                    <p>Selected</p>
                    <h3>{secondselect}</h3>
                  </span>
                </div>
                <div>
                  <span>
                    <p>Selected for Audition</p>
                    <h3>{secondAudition}</h3>
                  </span>
                </div>
                <div>
                  <span>
                    <p>Waiting List</p>
                    <h3>{shortlisted}</h3>
                  </span>
                </div>
                <div>
                  <span className="border-0">
                    <p>Not Selected</p>
                    <h3>{secondreject}</h3>
                  </span>
                </div>
              </div>

              <div className="long_Cards">
                <div className="firstDiv --3">
                  <p>Total Auditions</p>
                  <h3>{secondAudition + directScheduled}</h3>
                </div>
                <div>
                  <span>
                    <p>Selected</p>
                    <h3>{thirdSelect}</h3>
                  </span>
                </div>
                <div>
                  <span>
                    <p>Waiting List</p>
                    <h3>{scheduled}</h3>
                  </span>
                </div>
                <div>
                  <span className="border-0">
                    <p>Not Selected</p>
                    <h3>{thirdReject}</h3>
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
