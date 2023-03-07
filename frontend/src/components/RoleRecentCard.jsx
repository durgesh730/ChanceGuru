import React , {useState , useEffect} from "react";
import Hurray from "../assets/images/hurray.png";
import axios from "axios";
import server from "./server";

const RoleRecentCard = ({ index, card , activeCard }) => {
  const [project, setproject] = useState([]);
  const [role , setRole] = useState([]);
  const [character, setcharacter] = useState([]);
  const [seeker, setseeker] = useState([]);

  console.log(project);
  const getProject = () => {
    axios
      .get(`${server}/project/oneproject/${card[index].pId}`)
      .then((res) => {
        setproject(res.data);
        setRole(res.data.roles.filter((role => role._id == card[index].roleId)));
        const myrole = res.data.roles.filter((role => role._id == card[index].roleId)) ;
        setcharacter(myrole[0].characters.filter((char) => char._id == card[index].charId));
      })
      .catch((err)=>{
        console.log(err);
      })
    }
    useEffect(  () => {
      getProject();
  }, [])
  
  return (
    <>
      {activeCard === index + 1 && (
        <div className="d-flex">
          <div className="role_card">
            <div className="rCard_child d-flex justify-content-between align-items-center flex-column h-100 w-100">
              <figure className="hurrayDiv">
                <img src={Hurray} alt="hurray" />
              </figure>
              <p className="m-0">You have selected for a new role</p>
              <button>‘{project?.basicInfo?.name}’</button>
              <div className="rCard_detail d-flex justify-content-between align-items-center flex-column">
                <div>
                  <p>Role</p>
                  <span>{role? role[0]?.role : ""}</span>
                </div>

                <div>
                  <p>Character</p>
                  <span>{character?character[0]?.name : ""}</span>
                </div>

                <div>
                  <p>Selected On</p>
                  <span></span>
                </div>
                <div>
                  <p>Location</p>
                  <span>{project?.basicInfo?.city}</span>
                </div>
              </div>
              <h2>View Details</h2>
              <div className="rDetails_bottom">
                <figure>
                  <img src={Hurray} alt="" />
                </figure>
                <div>
                  <p>Contact Person</p>
                  <h5>{project?.basicInfo?.company}</h5>
                  <h6>Director</h6>
                </div>
                <div>
                  <p>Contact Details</p>
                  <h5>{project?.basicInfo?.phone}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RoleRecentCard;
