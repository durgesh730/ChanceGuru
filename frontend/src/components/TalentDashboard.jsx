import React , { useState , useEffect} from "react";
import Topbar from "./mini_components/Topbar";
import Searchbar from "./mini_components/Searchbar";
import Card from "./mini_components/Card";
import axios from "axios";

const TalentDashboard = () => {
    const [cards, setcards] = useState([]);
    console.log(cards);
    const getProjects = () => {
        axios
            .get("/project/allProjects")
            .then((res) => {
                setcards(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
      getProjects();
    }, [])
    
    return (
        <>
            <Topbar />
            <div className="container">
                <Searchbar />
                <div className="talent-heading d-flex justify-content-between">
                    <div className="">Suggestions</div>
                </div>
                <div className="main-container">
                    <ul className="grid-wrapper">
                        {cards?.map((card) => (
                            <Card card={card} />
                        ))}{" "}
                    </ul>
                </div>

                <div className="loadmore">
                    <button className="btn">Load More</button>
                </div>
            </div>
        </>
    );
};

export default TalentDashboard;
