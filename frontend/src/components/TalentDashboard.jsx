import React, { useState, useEffect, useContext } from "react";
import Topbar from "./mini_components/Topbar";
import Searchbar from "./mini_components/Searchbar";
import Card from "./mini_components/Card";
import axios from "axios";
import { AiFillCheckCircle } from "react-icons/ai";
import cardImg from "../assets/images/rectangle-13.png";
import AuthContext from "./AuthContext";

const TalentDashboard = () => {
    const auth = useContext(AuthContext);
    const [cards, setcards] = useState([]);
    const [profileStrength, setProfileStrength] = useState({
        profile: 0,
        talent: 0,
        photo: 0,
        education: 0,
        roles: 0,
    });

    const getProjects = () => {
        axios
            .get("http://localhost:5000/project/allProjects")
            .then((res) => {
                setcards(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getProjects();
    }, []);

    const user = JSON.parse(localStorage.getItem("login"));

    const handleShow = async () => {
        axios
            .get(`http://localhost:5000/profile/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                if (response.data !== null) {
                    profileCompletion(response.data);
                }
            })
            .catch((err) => {
                console.log(err.response);
            });
    };

    // Profile Strength Score
    const profileCompletion = (data) => {
        // console.log(data);
        const profilePerc = calculatePercentage(data.basicInfo);
        const talentPerc = calculatePercentage(data.talent);
        const photoPerc = data.photos.length === 0 ? 0 : 50;
        const videoPerc = data.videos.length === 0 ? 0 : 50;
        const eduPerc = data.education.length === 0 ? 0 : 50;
        const skillPerc = data.skills.length === 0 ? 0 : 50;
        const rolePerc = data.rolePref.length === 0 ? 0 : data.rolePref.length === 1 ? 50 : 100;

        const obj = {
            profile: profilePerc,
            talent: talentPerc,
            photo: photoPerc + videoPerc,
            education: eduPerc + skillPerc,
            roles: rolePerc,
        };

        setProfileStrength(obj);
    };

    // Calculate percentage by taking ratio of (total_filled_fields / total_fileds) * 100
    const calculatePercentage = (obj) => {
        let total_fileds = 0;
        let filled_fileds = 0;
        for (let property in obj) {
            total_fileds += 1;
            if (obj[property] === "") {
                continue;
            }
            filled_fileds += 1;
        }
        const percentage = (filled_fileds / total_fileds) * 100;
        return Math.floor(percentage);
    };

    useEffect(() => {
        handleShow();
    }, []);

    return (
        <>
            <Topbar />
            <div className="container-fluid" style={{ padding: "0 60px" }}>
                <Searchbar />
                <div className="talent-heading d-flex justify-content-between">
                    <div className="">Suggestions</div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <ul className="grid-wrapper">
                            {cards?.map((card) => (
                                <Card card={card} setClicked={auth.setClicked} />
                            ))}{" "}
                            <li className="side_div" style={auth.clicked ? {} : { display: "none" }}>
                                <div className="sd_1">
                                    <div className="sd_upper d-flex justify-content-center align-items-center flex-column mb-3">
                                        <img src={cardImg} alt="" />
                                        <p>{user.username}</p>
                                        <div>
                                            <h6>Profile Strength :</h6>
                                            <span>Awesome</span>
                                        </div>
                                        <div className="line"></div>
                                    </div>
                                    <div className="sd_lower">
                                        <div>
                                            <p>Add Profile Details</p>
                                            <span>
                                                <AiFillCheckCircle />
                                                <p>{profileStrength.profile}%</p>
                                            </span>
                                        </div>
                                        <div>
                                            <p>Add Talent Details</p>
                                            <span>
                                                <AiFillCheckCircle />
                                                <p>{profileStrength.talent}%</p>
                                            </span>
                                        </div>
                                        <div>
                                            <p>Add Photos & Videos</p>
                                            <span>
                                                <AiFillCheckCircle />
                                                <p>{profileStrength.photo}%</p>
                                            </span>
                                        </div>
                                        <div>
                                            <p>Add Education & Skills</p>
                                            <span>
                                                <AiFillCheckCircle />
                                                <p>{profileStrength.education}%</p>
                                            </span>
                                        </div>
                                        <div>
                                            <p>Add Role Preferences</p>
                                            <span>
                                                <AiFillCheckCircle />
                                                <p>{profileStrength.roles}%</p>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="loadmore">
                    <button className="btn">Load More</button>
                </div>
            </div>
        </>
    );
};

export default TalentDashboard;
