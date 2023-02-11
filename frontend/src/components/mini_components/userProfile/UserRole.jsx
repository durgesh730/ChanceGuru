import React from "react";

const UserRole = ({Data}) => {

  // console.log(Data.rolePref)

  return (
    <>
      <div className="userdetails d-flex justify-content-between flex-column">
        <div className="container-fluid ud_child">

          {Data.rolePref?.map((item, i) => {
            // console.log(item)
            return (
              <div key={i} >
                <p>Role Preferences</p>
                <h6>{item.role}</h6>
              </div>
            )
          })}

        </div>
      </div>
    </>
  );
};

export default UserRole;
