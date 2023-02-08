import React from "react";
import { useState } from "react";
import "../forms.css";
import axios from "axios";


const PhotoVideoForm = ({ display }) => {
    let photoForm = document.getElementById("photo-form");
    let vidForm = document.getElementById("vid-form");
    let photoToggle = document.getElementById("photo-toggle");
    let vidToggle = document.getElementById("vid-toggle");

    const toggle = (cur_form) => {
        if (cur_form == "photo") {
            photoForm.style.display = "block";
            vidForm.style.display = "none";
            photoToggle.classList.add("active-toggle");
            vidToggle.classList.remove("active-toggle");
        } else {
            vidForm.style.display = "block";
            photoForm.style.display = "none";
            photoToggle.classList.remove("active-toggle");
            vidToggle.classList.add("active-toggle");
        }
    };



    let show = {};
    if (display) {
        show = { display: "block" };
    } else {
        show = { display: "none" };
    }

    const [file, setFile] = useState();
    const [photoURL, setphotoURL] = useState({
        photo1: "",
        photo2: "",
        userId1: "1",
    });
    const { photo1, photo2, userId1 } = photoURL;

    const [videoURL, setvideoURL] = useState({
        youtube: "",
        vimeo: "",
        userId2: "1",
    });
    const { youtube, vimeo, userId2 } = videoURL;

    // const upload = (e) => {
    //     e.preventDefault();
    //     var imgcanvas = document.getElementById("canv1");
    //     var fileinput = document.getElementById("finput");
    //     var image = new SimpleImage(fileinput);
    //     image.drawTo(imgcanvas);
    //     console.log(e.target.files);
    //     setFile(URL.createObjectURL(e.target.files[0]));
    // }
    const handlePhotoInputChange = (e) => {
        setphotoURL({ ...photoURL, [e.target.name]: e.target.value });
    };

    const handlePhotoSubmit = (e) => {
        e.preventDefault();
        const data = photoURL;
        axios.put('/profile/photo', {
            photo1,
            photo2,
            userId1,
        },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }

        ).then((res) => {
            alert("Photos url data saved!")
            console.log("data added");
            console.log(res)
        })
        console.log(data);
    }

    const handleVideoInputChange = (e) => {
        setvideoURL({ ...videoURL, [e.target.name]: e.target.value });
    };

    const handleVideoSubmit = (e) => {
        e.preventDefault();
        const data = videoURL;
        axios.put('/profile/video', {
            youtube,
            vimeo,
            userId2,
        },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }
        ).then((res) => {
            alert("Videos url data saved!")
            console.log("data added");
            console.log(res)
        })
        console.log(data);
    }


    return (
        <>
            {" "}
            {
                <div className="form-body" style={show}>
                    <div className="form-container">
                        <div className="form-head">Portfolio</div>
                        <div className="form-desc">Upload your Photos & Videos Samples</div>
                        <div className="form-toggle d-flex justify-content-between  ">
                            <div
                                className="toggle-option active-toggle"
                                onClick={() => {
                                    toggle("photo");
                                }}
                                id="photo-toggle"
                            >
                                Photos
                            </div>
                            <div
                                className="toggle-option"
                                onClick={() => {
                                    toggle("vid");
                                }}
                                id="vid-toggle"
                            >
                                Videos
                            </div>
                        </div>
                        <form id="photo-form" onSubmit={handlePhotoSubmit}>
                            <input type="submit" className="full-width-btn" value="Upload Photo" />
                            <input type="text" className="form-control" placeholder="Enter photo url" name="photo1" value={photoURL.photo1} onChange={handlePhotoInputChange} />
                            <input type="text" className="form-control" placeholder="Enter photo url" name="photo2" value={photoURL.photo2} onChange={handlePhotoInputChange} />
                            {/* <input type="file" multiple="false" accept="image/*" id="finput" onChange={upload} /> */}

                            <img src={file} className="photoUpload" alt="" />
                            <canvas id="canv1"></canvas>
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
                        <form id="vid-form" style={{ display: "none" }} onSubmit={handleVideoSubmit}>
                            <div className="d-flex">
                                <input type="submit" className="full-width-btn" value="Add Youtube link" />
                                <p className="mx-1"></p>
                                <input type="submit" className="full-width-btn" value="Add Vimeo Link" />
                            </div>
                            <input type="text" className="form-control" placeholder="Youtube link" name="youtube" value={videoURL.youtube} onChange={handleVideoInputChange} />
                            <input type="text" className="form-control" placeholder="Vimeo link" name="vimeo" value={videoURL.vimeo} onChange={handleVideoInputChange} />

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
            }{" "}
        </>
    );
};

export default PhotoVideoForm;
