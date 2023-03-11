import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import server from '../server';

const Modal = ({ setModel, info, setProfile, UserProfileDeatils, roles }) => {

  const [jobstatus, setJobstatus] = useState([]);

  const length = jobstatus?.length;

  var charIds = [];
  roles?.map((item) => item.characters?.map((i) => {
    charIds.push(i._id);
  }))

  const handlestatus = async () => {
    let statuses = []
    charIds?.map(async (charId,index)=>{
      let data = await fetch (`http://localhost:5000/application/JobDetails/${UserProfileDeatils.userId}/${charId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json", 
        },})

        let res = await data.json()
        statuses[index] = await res
        
        if(statuses.length == charIds.length){
          setJobstatus(statuses)
        }

      // .then((response)=>{
      //   console.log(response.data)
      //   statuses.push(response.data)
      // })
      // .catch((error)=>{
      //   console.log(error.message)
      // })

      // setstatus(statuses)

      
      
      // console.log(res[0]);
      // statuses.push(res[0])
      // if(statuses.length > 0 && statuses.length == charIds.length){
      //   console.log(statuses)
      //   setstatus(statuses)
      // }
    })
  }

  console.log(charIds,jobstatus)


  const navigate = useNavigate();
  const roleApply = (chrId, rId) => {
    console.log(chrId,rId)
    axios
      .post(
        `${server}/application`,
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
        console.log(res)
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
    if(charIds.length > 0){

      handlestatus();
    }
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
          {roles.map((prRole, index) => {
            console.log(prRole)
            return (
              <>
                <div key={index}>
                  <div className="modal-roles">
                    <div className="role-name">
                      {prRole.role}
                      {"  "}
                      {`(${prRole.characters.length})`}
                    </div>
                    {prRole.characters.map((e, x) => {
                      console.log("Modal 128",x+index , jobstatus[x+index])
                      return (
                        <>
                          <div key={x}>
                            <div className="char-name">{e.name}</div>
                            <div className="total-roles">
                              {
                              (setProfile.profile &&
                                setProfile.talent &&
                                setProfile.photo &&
                                setProfile.education &&
                                setProfile.roles) >= 80 ?
                                (
                                  jobstatus.length == charIds.length && jobstatus[x+index]?.status == "notApplied" || jobstatus[x+index]?.status == "rejected" ?
                                    (
                                      <button
                                        style={{
                                          backgroundColor: "#8443e5",
                                          color: "white",
                                        }}
                                        onClick={() => {
                                          roleApply(e._id, prRole._id);
                                        }}
                                        className="apply-btn"
                                      >
                                        Apply
                                      </button>
                                    )
                                    :
                                    (
                                      jobstatus.length == charIds.length && (<button
                                        style={{
                                          backgroundColor: "#8443e5",
                                          color: "white",
                                        }}
                                        className="apply-btn"
                                      >
                                        {jobstatus[x+index]?.status}
                                      </button>)
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
          <button onClick={handleProfile} className="update-btn">
            Update-Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
