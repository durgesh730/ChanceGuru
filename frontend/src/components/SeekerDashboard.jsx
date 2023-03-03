import React, { useEffect, useState } from "react";
import Topbar from "./mini_components/Topbar";
import Searchbar from "./mini_components/Searchbar";
import Card2 from "./mini_components/Card2";
import { useNavigate } from "react-router-dom";
import "./style.css";

const SeekerDashboard = () => {
  const [query, setQuery] = useState("");
  const [card, setcard] = useState();
  const [searchData, setsearchData] = useState([]);

  // console.log(card[0].basicInfo.name)

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
      setcard(res);
    }
  };
  useEffect(() => {
    handleSearch();
  }, [query])

  const getProjects = async () => {
    const res = await fetch(
      "http://localhost:5000/project/allProjectsSeekers",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const response = await res.json();

    if (response !== null) {
      setcard(response);
      setsearchData(response);
    }
  };

  useEffect(() => {
    getProjects();
  }, [setcard]);

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/projectcreation`;
    navigate(path);
  };

  return (
    <>
      <Topbar />
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-12 searchBox">
            <Searchbar
              setQuery={setQuery}
              query={query}
              handleSearch={handleSearch}
            />
            <div
              className="searchDropdown"
              style={query === "" ? { border: "none" } : {}}
            >
              {searchData
                .filter((item, index) => {
                  const searchTerm = query.toLowerCase();
                  const name = item.basicInfo.name.toLowerCase();
                  return searchTerm && name.startsWith(searchTerm);
                })
                .map((item, index) => (
                  <div onClick={() => { setQuery(item.basicInfo.name); handleSearch() }}>
                    {item.basicInfo.name}
                  </div>
                ))}
            </div>
          </div>
          <div className="col-lg-4 col-12">
            <button
              className="btn btn-primary create-btn"
              onClick={routeChange}
            >
              Create New Project
            </button>
          </div>
        </div>

        <div className="talent-heading d-flex justify-content-between">
          <div className="">Projects</div>
        </div>
        <div className="main-container">
          <ul className="grid-wrapper">
            {card?.map((card, i) => (
              <Card2 key={i} card={card} />
            ))}{" "}
          </ul>
        </div>

        <div className="loadmore">
          <button className="btn">Load1 More</button>
        </div>
      </div>
    </>
  );
};

export default SeekerDashboard;
