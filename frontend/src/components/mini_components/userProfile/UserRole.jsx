import React from "react";

const UserRole = ({ Data }) => {

  // console.log(Data.rolePref)

  return (
    <>
      <div className="userdetails d-flex justify-content-between flex-column">
        <div className="container-fluid ud_child">


          <div>
            <p>Role Preferences</p>
            <div className="d-flex">
            {Data.rolePref?.map((item, i) => {
              // console.log(item)
              return (
                <h6>{i==0?item.role:", "+item.role}</h6>
              )
            })}
            
              
            </div>
          </div>


        </div>
      </div>
    </>
  );
};

export default UserRole;
