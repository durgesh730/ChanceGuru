import React from "react";

const Details = () => {
  return (
    <>
      <div className="userdetails d-flex justify-content-between flex-column h-100">
        <p className="purple_title">Personal Details</p>
        <div className="container-fluid ud_child">
          <div className="row">
            <div className="col-lg-3">
              <p>Full Name</p>
              <h6>Nick Davolt</h6>
            </div>
            <div className="col-lg-3">
              <p>Gender</p>
              <h6>Male</h6>
            </div>
            <div className="col-lg-3">
              <p>Date of Birth</p>
              <h6>01.01.1990</h6>
            </div>
            <div className="col-lg-3"></div>
          </div>
        </div>
        <hr />
        <p className="purple_title">Contacts Details</p>
        <div className="container-fluid ud_child">
          <div className="row">
            <div className="col-lg-3">
              <p>Email</p>
              <h6>nick_davolt@tesmail.com</h6>
            </div>
            <div className="col-lg-3"></div>
            <div className="col-lg-3">
              <p>Phone Contact</p>
              <h6>+1 263 786 678</h6>
            </div>
            <div className="col-lg-3"></div>
          </div>
        </div>
        <div className="container-fluid ud_child">
          <div className="row">
            <div className="col-lg-3">
              <p>City</p>
              <h6>New York City</h6>
            </div>
            <div className="col-lg-3">
              <p>State</p>
              <h6>New York</h6>
            </div>
            <div className="col-lg-3">
              <p>Country</p>
              <h6>United States</h6>
            </div>
            <div className="col-lg-3">
              <p>Address</p>
              <h6>22, Brookebond Apartment, Park Avenue, Red Street</h6>
            </div>
          </div>
        </div>
        <div className="container-fluid ud_child">
          <div className="row">
            <div className="col-lg-3">
              <p>Linkedin</p>
              <h6>NIL</h6>
            </div>
            <div className="col-lg-3">
              <p>Facebook</p>
              <h6>www.facebook.com/ NuanceTheatreCo</h6>
            </div>
            <div className="col-lg-3">
              <p>Instagram</p>
              <h6>Nuance Casting (@nuance_co)</h6>
            </div>
            <div className="col-lg-3"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
