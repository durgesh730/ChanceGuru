import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import server from "../../server";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const RolePref = ({ display, userData }) => {
  const user = JSON.parse(localStorage.getItem("login"));
  const navigate = useNavigate();
  let show = {};
  if (display) {
    show = { display: "block" };
  } else {
    show = { display: "none" };
  }

  const [formFields, setformFields] = useState([]);
  const [Roles, setRoles] = useState([]);
  const handleFormChange = (e, index) => {
    let data = [...formFields];
    data[index].roleId = e.target.value;
    setformFields(data);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let bool = false;
    formFields.forEach((item) => {
      if (item.roleId == "") {
        bool = true;
      }
    })
    if (bool) {
      alert("Please select role first.");
    } else {
      if(user.type === "admin"){
        axios
        .put(
          `${server}/profile/AdminSiderolePref/${userData._id}`,
          { formFields })
        .then((res) => {
          toast("Role prefrences saved successfully", {
            autoClose: 2000,
          })
          navigate("/");
        });
      }else{
        axios
          .put(
            `${server}/profile/rolePref`,
            { formFields },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            toast("Role prefrences saved successfully", {
              autoClose: 2000,
            })
            navigate("/");
          });
      }
    }
  };

  const addFields = (e) => {
    e.preventDefault();
    let obj = { roleId: "" };
    setformFields([...formFields, obj]);
  };

  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1);
    setformFields(data);
  };

  const handleShow = async () => {
    axios
      .get(`${server}/profile/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (response.data !== null) {
          if (response.data.rolePref !== 0) {
            setformFields(response.data.rolePref);
          }
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const getRoles = () => {
    axios.
      get(`${server}/admin/roles`)
      .then((res) => {
        setRoles(res.data);
      })
      .catch((err) => { console.log(err) });
  }


  // ============ fetching roles data =============

  const getRolesAtadminSide = (data) => {
    data.map(async (item) => {
      const res = await fetch(`${server}/admin/getRolesAtadminSide/${item.roleId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await res.json();
      if (data !== null) {
        setRoles(prev => [...prev, { role: data[0]?.role }]);
      }
    })
  }

  useEffect(() => {
    if (user.type === "user") {
      handleShow();
      getRoles();
    }
    else {
      getRolesAtadminSide(userData.rolePref)
      setformFields(userData.rolePref);
    }
  }, []);

  return (
    <>
      {
        <div className="form-body" style={show}>
          <div className="form-container">
            <div className="form-head">Role Prefrences</div>
            <div className="form-desc">
              Let us know about you to suggest the best for you.
            </div>

            <form onSubmit={handleFormSubmit}>
              <button className="full-width-btn" onClick={addFields}>
                Add Roles
              </button>
              {formFields?.map((form, index) => {
                return (
                  <div key={index} className="d-flex align-items-center">
                    <select required={true} className="form-control" value={form.roleId} onChange={(e) => { handleFormChange(e, index) }} >
                      <option value="" disabled >Select Role</option>
                      {Roles?.map((item, index) => {
                        return <option key={index} value={item._id} >{item.role}</option>
                      })}
                    </select>
                    <i
                      className="fa-solid fa-trash-can mx-2 mb-2"
                      onClick={() => removeFields(index)}
                    ></i>
                  </div>
                );
              })}

              <div className="d-flex justify-content-between mt-5">
                <input
                  type="submit"
                  className="col-4 cancel-btn btn btn-lg btn-block my-2"
                  value="Cancel"
                />
                <p className="col-1"></p>
                <input
                  type="submit"
                  className="col-7 save-btn btn btn-lg btn-block my-2"
                  value="Save"
                />
              </div>
            </form>
          </div>
        </div>
      }
    </>
  );
};

export default RolePref;
