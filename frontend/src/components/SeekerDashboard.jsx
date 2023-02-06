import React, { useEffect, useState } from "react";
import Topbar from "./mini_components/Topbar";
import Searchbar from "./mini_components/Searchbar";
import Card2 from "./mini_components/Card2";
import { useNavigate } from "react-router-dom";
import "./style.css";

const SeekerDashboard = () => {

    const [card, setcard] = useState([]);

    const getProjects = async () => {
        const res = await fetch("http://localhost:5000/project/allProjectsSeekers", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            }
        });
        const ok = await res.json();
        setcard(ok);
        // console.log(ok)
    }

    useEffect(() => {
        getProjects();
    }, [setcard])

    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/projectcreation`;
        navigate(path);
    }
    return (
        <>
            <Topbar />
            <div className="container">
                <div className="row">
                    <div className="col-lg-8"><Searchbar /></div>
                    <div className="col-lg-4">
                        <button className="btn btn-primary create-btn" onClick={routeChange}>Create New Project</button>
                    </div>

                </div>

                <div className="talent-heading d-flex justify-content-between">
                    <div className="">Projects</div>
                </div>
                <div className="main-container">
                    <ul className="grid-wrapper">
                        {card?.map((card,i) => (
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
