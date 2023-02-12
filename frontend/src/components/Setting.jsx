import React from "react";
import { FcSettings } from "react-icons/fc";
import Searchbar from "./mini_components/Searchbar";
import Topbar from "./mini_components/Topbar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const Setting = () => {
  return (
    <>
      <Topbar />
      <div className="notification p-5">
        <div className="p-4 shadow">
          <div className="d-flex align-items-center">
            <h1 style={{ color: "#8443e5" }}>
              Account Settings <FcSettings />{" "}
            </h1>
          </div>
          <hr />
          <div className="w-50">
            <div className="d-flex justify-content-between">
              <TextField
                id="standard-basic"
                label="First Name"
                className="me-5"
              />
              <TextField id="standard-basic" label="Last Name" />
            </div>
            <div className="d-flex justify-content-between">
              <TextField
                id="standard-basic"
                label="EmailAddress"
                className="me-5"
              />
              <TextField id="standard-basic" label="Phone Number" />
            </div>
            <div className="d-flex justify-content-start my-3">
              <Button variant="contained" color="primary" className="me-3">
                Save Changes
              </Button>
              <Button variant="contained">Cancel</Button>
            </div>
            <hr />
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="m-0">Deactivate your account</h5>
                <p className="text-secondary">
                  Details about your comapany and you account
                </p>
              </div>
              <Button variant="contained" color="secondary">
                Deactivate
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Setting;
