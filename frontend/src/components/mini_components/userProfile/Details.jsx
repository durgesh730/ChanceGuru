import React from "react";

const Details = ({Data}) => {

  return (
    <>
      <div className="userdetails d-flex justify-content-between flex-column h-100">
        <p className="purple_title">Personal Details</p>
        <div className="container-fluid ud_child">
          <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-3">
              <p>Full Name</p>
              <h6>{Data.fullname}</h6>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-3">
              <p>Gender</p>
              <h6>{Data.gender}</h6>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-3">
              <p>Date of Birth</p>
              <h6>{Data.DOB}</h6>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-3"></div>
          </div>
        </div>
        <hr />
        <p className="purple_title">Contacts Details</p>
        <div className="container-fluid ud_child">
          <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-3">
              <p>Email</p>
              <h6>{Data.email ? Data.email : "No email found"}</h6>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-3"></div>
            <div className="col-lg-3 col-md-3 col-sm-3">
              <p>Phone Contact</p>
              <h6>{Data.phone ? Data.phone : "No phone found"}</h6>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-3"></div>
          </div>
        </div>
        <div className="container-fluid ud_child">
          <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-3">
              <p>City</p>
              <h6>{Data.city}</h6>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-3">
              <p>State</p>
              <h6>{Data.state}</h6>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-3">
              <p>Country</p>
              <h6>{Data.country}</h6>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-3">
              <p>Address</p>
              <h6>{Data.address}</h6>
            </div>
          </div>
        </div>
        <div className="container-fluid ud_child">
          <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-3">
              <p>Linkedin</p>
              <h6>{Data.linkedin}</h6>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-3">
              <p>Facebook</p>
              <h6>{Data.facebook}</h6>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-3">
              <p>Instagram</p>
              <h6>{Data.instagram}</h6>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-3"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
