import React from "react";
import { useState } from "react";
import axios from "axios";
import "../forms.css";

const TalentDetailsForm = ({ display }) => {
    let show = {};
    if (display) {
        show = { display: "block" };
    } else {
        show = { display: "none" };
    }

    const [talentDetails, setTalentDetails] = useState({
        tType: "",
        ht: "",
        wt:"",
        bodyType: "",
        skinTone: "",
        eyeColor: "",
        hairColor: "",
        hairStyle: "",
        beardStyle: "",
        languages: "",
        boldScenes: "",
        allowances: "",
        traveling: "",
        userId: "1",
    });

    const {
        tType,
        ht,
        wt,
        bodyType,
        skinTone,
        eyeColor,
        hairColor,
        hairStyle,
        beardStyle,
        languages,
        boldScenes,
        allowances,
        traveling,
        userId
    } = talentDetails;

    const handleInputChange = (e) => {
        setTalentDetails({ ...talentDetails, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = talentDetails;
        axios.post('http://localhost:5000/profiles/talentDetails', {
            tType:tType,
        ht: ht,
        wt:wt,
        bodyType: bodyType,
        skinTone: skinTone,
        eyeColor: eyeColor,
        hairColor: hairColor,
        hairStyle: hairStyle,
        beardStyle: beardStyle,
        languages: languages,
        boldScenes: boldScenes,
        allowances:allowances,
        traveling: traveling,
        userId: userId
        }).then(() => {
            alert("Talent Details data saved!")
            console.log("data added")
        })
        console.log(data);
    };
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
                                    name="tType"
                                    onChange={handleInputChange}
                                    value={talentDetails.tType}
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
                                name="ht"
                                value={talentDetails.ht}
                                onChange={handleInputChange}
                                type="text"
                                className="form-control"
                                placeholder="Height"
                            />
                             <input
                                name="wt"
                                value={talentDetails.wt}
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
                                name="eyeColor"
                                onChange={handleInputChange}
                                value={talentDetails.eyeColor}
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
                                name="hairColor"
                                onChange={handleInputChange}
                                value={talentDetails.hairColor}
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
                                name="languages"
                                onChange={handleInputChange}
                                value={talentDetails.languages}
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
                                name="traveling"
                                onChange={handleInputChange}
                                value={talentDetails.traveling}
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
