import React, { useEffect, useState } from "react";
import Topbar from "./mini_components/Topbar";
import Searchbar from "./mini_components/Searchbar";
import Card3 from "./mini_components/Card3";
import { useNavigate } from "react-router-dom";
import "./style.css";
import server from "./server";

const SeekerDashboard = () => {

    const [card, setcard] = useState([]);
    const [query, setQuery] = useState("");
    const [searchData, setsearchData] = useState([]);
    const type = localStorage.getItem('type');

    const getAdminProjects = async () => {
        const data = await fetch(`${server}/project/getProjectForAdmin`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const re = await data.json();
        if (re !== null) {
            setcard(re);
        }
    }

    const getProjects = async () => {
        const res = await fetch(`${server}/project/allProjectsSeekers`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            }
        });
        const ok = await res.json();
        setcard(ok);
    }

    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/projectcreation`;
        navigate(path);
    }

    const handleSearch = async () => {
        const data = await fetch(
            `${server}/profile/searchSeekerData?name=${query}`,
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
            setsearchData(res)
        }
    };

    
    const handleSearchForAdmin = async () => {
        const data = await fetch(
            `${server}/project/SearchProjectForAdmin?name=${query}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const res = await data.json();
        if (res) {
            setcard(res);
            setsearchData(res)
        }
    };

    useEffect(() => {
        if(type === 'seeker'){
            handleSearch();
        }else if(type === 'admin'){
            handleSearchForAdmin();
        }
    }, [query])

    useEffect(() => {
        if (type === 'seeker') {
            getProjects();
        } else if (type === 'admin') {
            getAdminProjects();
        }
    }, [setcard])

    useEffect(() => {
        getAdminProjects();
    }, [])

    return (
        <>
            <Topbar />
            <div className="container">
                <div className="row">
                    {/* <div className="col-lg-8"><Searchbar /></div> */}
                    <div className="col-lg-8 searchBox">
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
                                    <div onClick={() => { setQuery(item.basicInfo.name) }}>
                                        {item.basicInfo.name}
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <button className="btn btn-primary create-btn" onClick={routeChange}>Create New Project</button>
                    </div>

                </div>

                <div className="talent-heading d-flex justify-content-between">
                    <div className="">Projects</div>
                </div>
                <div className="main-container">
                    <ul className="grid-wrapper">
                        {card?.map((card, i) => (
                            <Card3 key={i} card={card} />
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
