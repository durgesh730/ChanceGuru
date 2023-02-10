import React from "react";

const Education = ({ Data }) => {

  return (
    <>
      <div className="userdetails d-flex justify-content-between flex-column">
        <p className="purple_title">Education</p>
        <div className="container-fluid ud_child">
          {Data.education?.map((item, i) => {
            return (
              <>
                <div>
                  <p>School</p>
                  <h6>{item.startYear}</h6>
                  <h6>St.Bose</h6>
                </div>
                <div className="mt-2">
                  <p>Course & College</p>
                  <h6>{item.endYear}</h6>
                  <h6>{item.college}</h6>
                </div>
              </>
            )
          })}
        </div>
        <hr />
        <p className="purple_title">Skills</p>
        <div className="container-fluid ud_child">
          {Data.skills?.map((item, i) => {

            return (
              <>
                <div key={i} >
                  <h6>
                     {item.skill}
                  </h6>
                </div>
              </>
            )
          })}
        </div>
      </div>
    </>
  );
};

export default Education;
