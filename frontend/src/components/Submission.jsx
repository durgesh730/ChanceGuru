import React, { useEffect, useState } from "react";
import Searchbar from "./mini_components/Searchbar";
import Topbar from "./mini_components/Topbar";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import godfather from "../assets/images/godfather.png";

import { NavLink, useLocation } from "react-router-dom";
import SideNav from "./SideNav";
import axios from "axios";
import SubmissionStatus from "./SubmissionStatus";

const Submission = () => {
  const [active, setActive] = useState("");
  const [cards, setcards] = useState();

  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    const data = await fetch(
      `http://localhost:5000/profile/searchSeekerData?name=${query}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const res = await data.json();

    if (res) {
      setcards(res);
    }
  };

  // const getProjects = () => {
  //   axios
  //     .get("http://localhost:5000/project/allProjectsSeekers")
  //     .then((res) => {
  //       setcards(res.data)
  //       console.log(res.data)
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  // }
  const url = "http://localhost:5000/project/allProjectsSeekers";
  // const url = "http://localhost:5000/project/searchData?name=";

  const getProjects = (e) => {
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setcards(res.data);
        console.log("proj");
        console.log(res.data);
      });
  };

  useEffect(() => {
    getProjects();
  }, []);

  console.log("Cards");
  console.log(cards);

  return (
    <>
      <Topbar />
      <div className="container-fluid p-0">
        <div className="row">
          <div className="side_nav col-lg-2">
            <SideNav />
          </div>
          <div className="col-lg-10">
            <div className="px-4">
              <Searchbar
                setQuery={setQuery}
                query={query}
                handleSearch={handleSearch}
              />
              <h5 className="purple_title">Projects</h5>
              {cards?.map((item, index) => {
                console.log(item);
                // ========= calculate total charcters =============
                var char = 0;
                var all = new Array();
                var a = 0;
                {
                  item.roles.map((i) => {
                    char = char + i.characters.length;
                    var length = i.characters.length;
                    for (i = 0; i < length; i++) {
                      all[i] = char;
                    }

                    for (i = 0; i < all.length; i++) {
                      if (all[i] > a) a = all[i];
                    }
                  });
                }

                return (
                  <>
                    <div className="audition_accordion mb-3 ">
                      <div className="aa1 border p-2">
                        <SubmissionStatus a={a} project={item} id={item._id} />
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Submission;
