import React from "react";

const Education = () => {
  return (
    <>
      <div className="userdetails d-flex justify-content-between flex-column">
        <p className="purple_title">Education</p>
        <div className="container-fluid ud_child">
          <div>
            <p>School</p>

            <h6>2008</h6>
            <h6>The School at Steppenwolf</h6>
          </div>
          <div className="mt-2">
            <p>Course & College</p>
            <h6>2011</h6>
            <h6>Medium</h6>
          </div>
        </div>
        <hr />
        <p className="purple_title">Skills</p>
        <div className="container-fluid ud_child">
          <div>
            <h6>
              Mezzo-Soprano, Guitar, Dialects upon request, Double-jointed arm
              contortions, Dance, Yoga
            </h6>
          </div>
        </div>
      </div>
    </>
  );
};

export default Education;
