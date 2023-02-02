import React from "react";
import Topbar from "./mini_components/Topbar";
import Searchbar from "./mini_components/Searchbar";
import Card2 from "./mini_components/Card2";
import { useNavigate } from "react-router-dom";
import "./style.css";


const SeekerDashboard = () => {
    const cards = [
        {
            id: 1,
            title: "‘Disney on Broadway’",
            description: "Casting dancers for touring productions of Disney’s Aladdin...",
            author: "Muthukumar",
            roles: "5",
            deadline: "1 day ago",
        },
        {
            id: 2,
            title: "‘The High Cost of Loving’",
            description: "Casting dancers for touring productions of Disney’s Aladdin...",
            author: "Muthukumar",
            roles: "5",
            deadline: "1 day ago",
        },
        {
            id: 3,
            title: "‘Fall in Love’",
            description: "Casting dancers for touring productions of Disney’s Aladdin...",
            author: "Muthukumar",
            roles: "5",
            deadline: "1 day ago",
        },
        {
            id: 4,
            title: "‘Actress Needed for a Short Film’",
            description: "Casting dancers for touring productions of Disney’s Aladdin...",
            author: "Muthukumar",
            roles: "5",
            deadline: "1 day ago",
        },
    ];
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
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
                        <button className="btn btn-primary create-btn"  onClick={routeChange}>Create New Project</button>
                    </div>

                </div>

                <div className="talent-heading d-flex justify-content-between">
                    <div className="">Projects</div>
                </div>
                <div className="main-container">
                    <ul className="grid-wrapper">
                        {cards.map((card) => (
                            <Card2 card={card} />
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
