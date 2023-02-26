import React from "react";
import { useState, useEffect } from "react";
import "../forms.css";
import axios from "axios";
import AWS from 'aws-sdk';
import { Buffer } from 'buffer';

const PhotoVideoForm = ({ display, toggleForm }) => {
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


    const [photoURL, setphotoURL] = useState([{
        link: ""
    }]);

    const [videoURL, setvideoURL] = useState([{
        link: ""
    }]);

  
    const handlePhotoInputChange = (e, index) => {
        let data = [...photoURL];
        data[index].link = e.target.value;
        setphotoURL(data);
    };

    const addFields = (e) => {
        e.preventDefault();
        let obj = { link: "" };
        setphotoURL([...photoURL, obj]);
    };

    const removeFields = (index) => {
        let data = [...photoURL];
        data.splice(index, 1);
        setphotoURL(data);
    };

    const handlePhotoSubmit = (e) => {
        e.preventDefault();
        const data = photoURL;
        axios.put('http://localhost:5000/profile/photo', {
            photoURL
        },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }

        ).then((res) => {
            alert("Photos url data saved!")
            console.log("data added");
            console.log(res);
            toggle("vid");
        })
        console.log(data);
    }

    const handleVideoInputChange = (e, index) => {
        let data = [...videoURL];
        data[index].link = e.target.value;
        setvideoURL(data);
    };

    const addFieldsVideo = (e) => {
        e.preventDefault();
        let obj = { link: "" };
        setvideoURL([...videoURL, obj]);
    };

    const removeFieldsVideo = (index) => {
        let data = [...videoURL];
        data.splice(index, 1);
        setvideoURL(data);
    };

    const handleVideoSubmit = (e) => {
        e.preventDefault();
        const data = videoURL;
        axios.put('http://localhost:5000/profile/video', videoURL,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }
        ).then((res) => {
            alert("Videos url data saved!")
            console.log("data added");
            console.log(res);
            if (res) {
                toggleForm("skill");
            }
        })
        console.log(data);
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
                    if (response.data.photos.length !== 0) {
                        setphotoURL(response.data.photos);
                    }
                    if (response.data.videos.length !== 0) {
                        setvideoURL(response.data.videos);
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

    //s3 bucket image upload
    AWS.config.update({
        accessKeyId: 'AKIAUXONWQ3HERXZEX5M',
        secretAccessKey: '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',
        region: 'ap-south-1',
        signatureVersion: 'v4',
    });

    const [imageUrl, setImageUrl] = useState([{
        link: ""
    }]);
    const [file, setFile] = useState([null]);

    const handleFileInputChange = (e) => {
        setFile(e.target.files);
    }

    const handleFileUpload = async () => {
        if (!file) {
            return;
        }

        const s3 = new AWS.S3();
        const formData = new FormData();
        const urls = [];

        for (let i = 0; i < file.length; i++) {
            formData.append("images",file[i]);
            const files = file[i];
            const params = {
                Bucket: 'image-orders-bucket',
                Key: `${Date.now()}.${files.name}`,
                Body: files,
                ContentEncoding: "base64",
                ContentType: file.type,
            };
            const { Location } = await s3.upload(params).promise();
            urls.push(Location);
            var obj = { link: urls[i] };
            setImageUrl([...imageUrl , obj]);
            let data = [...photoURL];
            data[i].link = urls[i];
            setphotoURL([...photoURL,obj]);
            //setphotoURL([...photoURL, obj]);
            console.log('uploading to s3', urls[i]);
        }
       console.log(photoURL)
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
                            <div className="d-flex">
                                <input type="file" multiple="true" accept="image/*" id="finput" onChange={handleFileInputChange} />

                                <input type="button" className="full-width-btn" value="Upload Photo" onClick={handleFileUpload} />

                                {imageUrl && (
                                    <img src={imageUrl} className="photoUpload" alt="" />
                                )}

                                <p className="mx-1"></p>
                                <input onClick={addFields} type="button" className="full-width-btn" value="Add Photo Link" />
                            </div>
                            {photoURL.map((item, index) => {
                                return (
                                    <>
                                        <div key={index} className="d-flex align-items-center">
                                            <input required type="text" className="form-control" placeholder="Enter photo url" name="photo1" value={item.link} onChange={(e) => { handlePhotoInputChange(e, index) }} />
                                            <i
                                                className="fa-solid fa-trash-can mx-2 mb-2"
                                                onClick={() => removeFields(index)}
                                            ></i>
                                        </div>
                                    </>
                                )
                            })}
                            {/* <input type="file" multiple="true" accept="image/*" id="finput" onChange={handleFileInputChange} /> */}

                            {/* <img src={file} className="photoUpload" alt="" /> */}
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
                                <input onClick={addFieldsVideo} type="button" className="full-width-btn" value="Add Youtube link" />
                                <p className="mx-1"></p>
                                <input onClick={addFieldsVideo} type="button" className="full-width-btn" value="Add Vimeo Link" />
                            </div>
                            {videoURL.map((item, index) => {
                                return (
                                    <>
                                        <div key={index} className="d-flex align-items-center">
                                            <input required type="text" className="form-control" placeholder="Enter photo url" name="photo1" value={item.link} onChange={(e) => { handleVideoInputChange(e, index) }} />
                                            <i
                                                className="fa-solid fa-trash-can mx-2 mb-2"
                                                onClick={() => removeFieldsVideo(index)}
                                            ></i>
                                        </div>
                                    </>
                                )
                            })}

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
