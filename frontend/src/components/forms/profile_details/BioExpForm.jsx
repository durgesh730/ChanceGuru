import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import server from "../../server";

const BioExpForm = ({ display, toggleForm, userData }) => {
  let bioForm = document.getElementById("bio-form");
  let expForm = document.getElementById("exp-form");
  let bioToggle = document.getElementById("bio-toggle");
  let expToggle = document.getElementById("exp-toggle");

  const user = JSON.parse(localStorage.getItem("login"));

  const [profileData, setprofileData] = useState({});
  const [experience, setExperience] = useState()
  const toggle = (cur_form) => {
    if (cur_form == "bio") {
      bioForm.style.display = "block";
      expForm.style.display = "none";
      bioToggle.classList.add("active-toggle");
      expToggle.classList.remove("active-toggle");
    } else {
      expForm.style.display = "block";
      bioForm.style.display = "none";
      bioToggle.classList.remove("active-toggle");
      expToggle.classList.add("active-toggle");
    }
  };

  let show = {};
  if (display) {
    show = { display: "block" };
  } else {
    show = { display: "none" };
  }

  const [bioData, setBioData] = useState({
    bio: "",
  });

  const [expData, setExpData] = useState({
    workedIn: "",
    workedAs: "",
    startDate: "",
    endDate: "",
    aboutWork: "",
  });

  const { bio } = bioData;

  const handleBioInputChange = (e) => {
    setBioData({ ...bioData, [e.target.name]: e.target.value });
  };

  const handleExpInputChange = (e) => {
    setExpData({ ...expData, [e.target.name]: e.target.value });
  };

  const handleBioSubmit = (e) => {
    e.preventDefault();
    const data = bioData;
    axios
      .put(
        `${server}/profile/portfolio`,
        { bio: bio },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        alert("Bio Details data saved!");
        console.log(res);
        toggle("exp");
      });
    console.log(data);
  };

  const handleExpSubmit = (e) => {
    e.preventDefault();
    const data = expData;
    console.log(e.target)

    let newExp = experience ? [...experience, data] : [data]
    if (experience) {
      setExperience([...experience, data])
    }
    else {
      setExperience([data])
    }
    axios
      .put(
        `${server}/profile/portfolio/exp`,
        newExp,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        alert("Experience Details data saved!");
        setExpData({
          workedIn: "",
          workedAs: "",
          startDate: "",
          endDate: "",
          aboutWork: "",
        })
        document.getElementsByClassName("ExpformData")[0].style.display = "none"
        console.log(res);
        if (res) {
          toggleForm("photo");
        }
      });
    console.log(data);
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
          if (response.data.portfolio.bio !== "") {
            setBioData({ bio: response.data.portfolio.bio});
          }
          if (response.data.portfolio.experience.length !== 0) {
            setExperience(response.data.portfolio.experience);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (user.type ==="user") {
      handleShow();
    } else {
      setBioData({bio:userData?.portfolio.bio});
      if (userData.portfolio.experience.length !== 0) {
        setExperience(userData.portfolio.experience);
      }
    }
  }, []);

  const slideDiv = useRef("");
  const prevCon = (e) => {
    e.preventDefault();
    let width = slideDiv.current.offsetWidth;
    slideDiv.current.scrollLeft = slideDiv.current.scrollLeft - width;
    console.log(slideDiv);
  };
  const nextCon = (e) => {
    e.preventDefault();
    let width = slideDiv.current.offsetWidth;
    slideDiv.current.scrollLeft = slideDiv.current.scrollLeft + width;
  };

  const handleAddExperience = (e) => {
    e.preventDefault()
    e.target.nextElementSibling.style.display = "block"
  }
  const handleCancelExperience = (e) => {
    e.preventDefault()
    setExpData({
      workedIn: "",
      workedAs: "",
      startDate: "",
      endDate: "",
      aboutWork: "",
    })
    document.getElementsByClassName("ExpformData")[0].style.display = "none"


  }
  return (
    <>
      {
        <div className="form-body" style={show}>
          <div className="form-container">
            <div className="form-head">Portfolio</div>
            <div className="form-desc">
              Let us know about you to suggest the best for you.
            </div>
            <div className="form-toggle d-flex justify-content-between  ">
              <div
                className="toggle-option active-toggle"
                onClick={() => {
                  toggle("bio");
                }}
                id="bio-toggle"
              >
                Bio
              </div>
              <div
                className="toggle-option"
                onClick={() => {
                  toggle("exp");
                }}
                id="exp-toggle"
              >
                Experience
              </div>
            </div>
            <form
              id="bio-form"
              onSubmit={(e) => {
                handleBioSubmit(e);
              }}
            >

              <textarea
                name="bio"
                value={bioData.bio}
                onChange={handleBioInputChange}
                id="bio"
                className="form-control text-area"
                rows="8"
                placeholder="Write about yourself"
                maxLength="250"
              ></textarea>
              <label htmlFor="bio" className="mx-3 small-text">
                Minimum 256 characters
              </label>
              <div className="d-flex justify-content-between mt-5">
                <input
                  type="button"
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
            <form
              id="exp-form"
              style={{ display: "none" }}
              onSubmit={handleExpSubmit}
            >
              {experience ? (<div className="scroll_x ">
                <div className="container-fluid experience_container">
                  <div className="ec_child" ref={slideDiv}>
                    {experience?.map((item, index) => {
                      return (

                        <div>
                          <span class="experienceComp" style={{ fontWeight: "700", color: "#6c54a6" }}>
                            {item.workedIn}
                          </span>
                          <br />
                          <span class="experiencePos" style={{ fontSize: "13px" }}>
                            {item.workedAs} | {item.startDate} - {item.endDate}
                          </span>
                          <p class="experienceDesc" style={{ fontSize: "12px" }}>
                            {item.aboutWork}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="controllers">
                    <button onClick={prevCon}>
                      <BsChevronCompactLeft />
                    </button>
                    <button onClick={nextCon}>
                      <BsChevronCompactRight />
                    </button>
                  </div>
                </div>
              </div>) : ""}
              <input
                type="submit"
                className="full-width-btn"
                value="Add Experience"
                onClick={handleAddExperience}
              />
              <div className="ExpformData" style={{ display: "none" }} >

                <input
                  name="workedIn"
                  value={expData.workedIn}
                  onChange={handleExpInputChange}
                  type="text"
                  className="form-control"
                  placeholder="Worked in"
                />
                <input
                  name="workedAs"
                  value={expData.workedAs}
                  onChange={handleExpInputChange}
                  type="text"
                  className="form-control"
                  placeholder="Worked as"
                />
                <input
                  name="startDate"
                  value={expData.startDate}
                  onChange={handleExpInputChange}
                  type="text"
                  className="form-control"
                  placeholder="Start date"
                />
                <input
                  name="endDate"
                  value={expData.endDate}
                  onChange={handleExpInputChange}
                  type="text"
                  className="form-control"
                  placeholder="End date"
                />
                <textarea
                  name="aboutWork"
                  value={expData.aboutWork}
                  onChange={handleExpInputChange}
                  id="bio"
                  className="form-control text-area"
                  rows="5"
                  placeholder="About Work"
                  maxLength="250"
                ></textarea>
                <div className="row">
                  <input
                    type="button"
                    className="col-4 cancel-btn btn btn-lg btn-block my-2"
                    value="Cancel"
                    onClick={handleCancelExperience}
                  />
                  <p className="col-1"></p>
                  <input
                    type="submit"
                    className="col-7 save-btn btn btn-lg btn-block my-2"
                    value="Save"
                  />
                </div>
              </div>

            </form>
          </div>
        </div>
      }
    </>
  );
};

export default BioExpForm;
