import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Modal = ({ setModel, info, setProfile, UserProfileDeatils, roles }) => {

  const [status, setstatus] = useState();

  const length = status?.length;

  var charId = 0;
  roles?.map((item) => item.characters?.map((i) => {
    charId = i._id;
  }))

  const handlestatus = async () => {
    const data = await fetch(`http://localhost:5000/application/JobDetails/${UserProfileDeatils.userId}/${charId} `, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      }
    })
    const res = await data.json();
    console.log(res);
    setstatus(res)
  }

  const navigate = useNavigate();
  const roleApply = (chrId, rId) => {
    axios
      .post(
        "http://localhost:5000/application",
        {
          pId: info._id,
          roleId: rId,
          charId: chrId,
          status: "applied",
          seekerId: info.seekerId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setModel(false);
        alert("You have successfully applied for this role");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleProfile() {
    navigate("/profiledetails");
  }

  useEffect(() => {
    handlestatus();
  }, [])

  return (
    <div className="modal-background my-4">
      <div className="modal-container">
        {(setProfile.profile &&
          setProfile.talent &&
          setProfile.photo &&
          setProfile.education &&
          setProfile.roles) <= 80 ? (
          <div className="modal-header">
            Your profile is weak to apply for this roles.
          </div>
        ) : (
          ""
        )}

        <div className="modal-body">
          <div className="modal-name">‘{info.basicInfo.name}’</div>
          <div className="secondary-text">Roles</div>
          {roles.map((item, index) => {
            return (
              <>
                <div key={index}>
                  <div className="modal-roles">
                    <div className="role-name">
                      {item.role}
                      {"  "}
                      {`(${item.characters.length})`}
                    </div>
                    {item.characters.map((e, x) => {

                      return (
                        <>
                          <div key={x}>
                            <div className="char-name">{e.name}</div>
                            <div className="total-roles">
                              {(setProfile.profile &&
                                setProfile.talent &&
                                setProfile.photo &&
                                setProfile.education &&
                                setProfile.roles) >= 80 ? (

                                length === 0 ? (
                                  <button
                                    style={{
                                      backgroundColor: "#8443e5",
                                      color: "white",
                                    }}
                                    onClick={() => {
                                      roleApply(e._id, item._id);
                                    }}
                                    className="apply-btn"
                                  >
                                    Apply
                                  </button>) : (
                                  status?.map((item, i) => {

                                    return (
                                      item.status === "applied" && e._id || item.status === "shortlisted"  && e._id || item.status === "selected"  && e._id || item.status === "scheduled"  && e._id ? ("") : (
                                        <button
                                          style={{
                                            backgroundColor: "#8443e5",
                                            color: "white",
                                          }}
                                          onClick={() => {
                                            roleApply(e._id, item._id);
                                          }}
                                          className="apply-btn"
                                        >
                                          Apply
                                        </button>
                                      )
                                    )
                                  })
                                )
                              ) : (
                                <button
                                  style={{
                                    backgroundColor: "grey",
                                    color: "white",
                                  }}
                                  className="apply-btn"
                                >
                                  Apply
                                </button>
                              )}
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              </>
            );
          })}
        </div>
        <div className="modal-footer">
          <button
            className="cancel-btn"
            onClick={() => {
              setModel(false);
            }}
          >
            Cancel
          </button>
          <span className="mx-3"></span>
          <button onClick={handleProfile} className="update-btn">
            Update-Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
