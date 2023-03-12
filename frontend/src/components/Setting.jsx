import React, { useEffect, useState } from "react";
import { FcSettings } from "react-icons/fc";
// import Searchbar from "./mini_components/Searchbar";
import Topbar from "./mini_components/Topbar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import server from "./server";
import axios from "axios";


const Setting = () => {
  const account = JSON.parse(localStorage.getItem("login"));
  const [link, setLink] = useState({ link: "" });

  const useInputs = (initialValue) => {
    const [value, setValue] = useState(initialValue);
    const handleChange = (e) => {
      setValue(e.target.value);
    };

    const changeValue = (v) => {
      setValue(v);
    }
    return {
      value,
      onChange: handleChange,
      onSet: changeValue
    }
  }

  const username = useInputs('');
  const email = useInputs('');
  const phone = useInputs('');


  const handleReset = async () => {
    const data = await fetch(`${server}/auth/ResetLoggedUserData/${account._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ username, email, phone, link })
    });
    const res = await data.json();
    localStorage.setItem("login", JSON.stringify(res.save));
    console.log(res)
  };

  useEffect(() => {
    username.onSet(account.username)
    email.onSet(account.email)
    phone.onSet(account.phone)
  }, [])

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

              <div>
                <label for="formFile" class="form-label">Upload Image</label>
                <input class="form-control" type="file"
                  name="link"
                  value={link.link}
                  onChange={(event) => {
                    setLink((prev) => ({ ...prev, link: event.target.value }));
                  }}
                  id="formFile" />
              </div>

              <TextField
                id="standard-basic"
                label="First Name"
                className="me-5 mx-4 my-3 "
                name="username"
                value={username.value}
                onChange={username.onChange}
              />
            </div>
            <div className="d-flex justify-content-between">
              <TextField
                id="standard-basic"
                label="EmailAddress"
                className="me-5"
                name="email"
                value={email.value}
                onChange={email.onChange}
              />
              <TextField id="standard-basic" label="Phone Number"
                name="email"
                value={phone.value}
                onChange={phone.onChange}
              />
            </div>
            <div className="d-flex justify-content-start my-3">
              <Button onClick={handleReset} variant="contained" style={{backgroundColor:"#8443e5", color:"white"}}  className="me-3">
                Save Changes
              </Button>
              <Button variant="contained">Cancel</Button>
            </div>
            <hr />
          </div>
        </div>
      </div>
    </>
  );
};

export default Setting;
