import React from "react";
import { useState , useEffect } from "react";
import axios from "axios";
import "../forms.css";

const TalentDetailsForm = ({ display , toggle , getFunction}) => {
    let show = {};
    if (display) {
        show = { display: "block" };
    } else {
        show = { display: "none" };
    }
    const [talentDetails, setTalentDetails] = useState({
        type: "",
        height: "",
        weight: "",
        bodyType: "",
        skinTone: "",
        eyeColour: "",
        hairColour: "",
        hairStyle: "",
        beardStyle: "",
        language: "",
        boldScenes: "",
        allowances: "",
        travelling: "",
    });
    
    const handleInputChange = (e) => {
        setTalentDetails({ ...talentDetails, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const { type, height, weight, bodyType, skinTone, eyeColour, hairColour,
            hairStyle, beardStyle, language, boldScenes, allowances, travelling
        } = talentDetails;

        const res = await fetch("http://localhost:5000/profile/talent", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                type, height, weight, bodyType, skinTone,
                eyeColour, hairColour, hairStyle, beardStyle,
                language, boldScenes, allowances, travelling
            })
        });
        const ok = await res.json();
        console.log(ok);
        if(ok){
            toggle("bio");
        }
    }

    const handleShow = async () => {
        axios
            .get(`http://localhost:5000/profile/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                if (response.data !== null) {
                    if(response.data.talent.type !== ""){
                        setTalentDetails(response.data.talent)
                    }
                }
            })
            .catch((err) => {
                console.log(err.response);
            });
    }

    useEffect(() => {
        handleShow();
    }, [])
    
    return (
        <>
            {
                <div className="form-body" style={show}>
                    <div className="form-container">
                        <div className="form-head">Talent Details</div>
                        <div className="form-desc">Let us know about you to suggest the best for you.</div>
                        <form onSubmit={handleSubmit}>
                            <div style={{ position: "relative", display: "flex" }}>
                                <select
                                    name="type"
                                    onChange={handleInputChange}
                                    value={talentDetails.type}
                                    className="form-control form-select"
                                >
                                    <option value="" disabled selected>
                                        I'm an
                                    </option>
                                    <option>Actor</option>
                                    <option>Director</option>
                                </select>
                            </div>
                            <input
                                name="height"
                                value={talentDetails.height}
                                onChange={handleInputChange}
                                type="text"
                                className="form-control"
                                placeholder="Height"
                            />
                            <input
                                name="weight"
                                value={talentDetails.weight}
                                onChange={handleInputChange}
                                type="text"
                                className="form-control"
                                placeholder="Weight"
                            />
                            <select
                                name="bodyType"
                                onChange={handleInputChange}
                                value={talentDetails.bodyType}
                                className="form-control form-select"
                            >
                                <option value="" disabled selected>
                                    Body Type
                                </option>
                                <option>Body1</option>
                                <option>body2</option>
                            </select>
                            <select
                                name="skinTone"
                                onChange={handleInputChange}
                                value={talentDetails.skinTone}
                                className="form-control form-select"
                            >
                                <option value="" disabled selected>
                                    Skin Tone
                                </option>
                                <option>skin1</option>
                                <option>skin2</option>
                            </select>
                            <select
                                name="eyeColour"
                                onChange={handleInputChange}
                                value={talentDetails.eyeColour}
                                className="form-control form-select"
                            >
                                <option value="" disabled selected>
                                    Eye Color
                                </option>
                                <option>Blue</option>
                                <option>Brown</option>
                                <option>Green</option>
                            </select>
                            <select
                                name="hairColour"
                                onChange={handleInputChange}
                                value={talentDetails.hairColour}
                                className="form-control form-select"
                            >
                                <option value="" disabled selected>
                                    Hair Color
                                </option>
                                <option>Black</option>
                                <option>Brown</option>
                                <option>Blonde</option>
                            </select>
                            <select
                                name="hairStyle"
                                onChange={handleInputChange}
                                value={talentDetails.hairStyle}
                                className="form-control form-select"
                            >
                                <option value="" disabled selected>
                                    Hair Style
                                </option>
                                <option>Bob Cut</option>
                                <option>Long Straight</option>
                                <option>Curly</option>
                            </select>
                            <select
                                name="beardStyle"
                                onChange={handleInputChange}
                                value={talentDetails.beardStyle}
                                className="form-control form-select"
                            >
                                <option value="" disabled selected>
                                    Beard Style
                                </option>
                                <option>Sharp Cut</option>
                                <option>Dense Long</option>
                                <option>None</option>
                            </select>
                            <select
                                name="language"
                                onChange={handleInputChange}
                                value={talentDetails.language}
                                className="form-control form-select"
                            >
                                <option value="" disabled selected>
                                    Language
                                </option>
                                <option>English</option>
                                <option>Marathi</option>
                                <option>Hindi</option>
                            </select>
                            <select
                                name="boldScenes"
                                onChange={handleInputChange}
                                value={talentDetails.boldScenes}
                                className="form-control form-select"
                            >
                                <option value="" disabled selected>
                                    Bold Scenes
                                </option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                            <select
                                name="allowances"
                                onChange={handleInputChange}
                                value={talentDetails.allowances}
                                className="form-control form-select"
                            >
                                <option value="" disabled selected>
                                    Allowances
                                </option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                            <select
                                name="travelling"
                                onChange={handleInputChange}
                                value={talentDetails.travelling}
                                className="form-control form-select"
                            >
                                <option value="" disabled selected>
                                    Traveling
                                </option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                            <div className="row">
                                <input
                                    type="submit"
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
                    </div>
                </div>
            }
        </>
    );
};

export default TalentDetailsForm;
