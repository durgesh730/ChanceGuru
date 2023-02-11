import React from "react";

const Talents = ({Data}) => {


  return (
    <>
      <div className="userdetails d-flex justify-content-between flex-column">
        <p className="purple_title">Body</p>
        <div className="container-fluid ud_child">
          <div className="row">
            <div className="col-lg-3">
              <p>Height & Weight</p>
              <h6>{Data.height} ,  {Data.weight} </h6>
            </div>
            <div className="col-lg-3">
              <p>5'10", 135 lbs</p>
              <h6>Medium</h6>
            </div>
            <div className="col-lg-3">
              <p>Skin Tone</p>
              <h6>{Data.skinTone}</h6>
            </div>
            <div className="col-lg-3"></div>
          </div>
        </div>
        <hr />
        <p className="purple_title">Face & Head</p>
        <div className="container-fluid ud_child">
          <div className="row">
            <div className="col-lg-3">
              <p>Eye Color</p>
              <h6>{Data.eyeColour}</h6>
            </div>
            <div className="col-lg-3">
              <p>Hair color</p>
              <h6>{Data.hairColour}</h6>
            </div>
            <div className="col-lg-3">
              <p>Hair Style</p>
              <h6>Short</h6>
            </div>
            <div className="col-lg-3">
              <p>Beard Style</p>
              <h6>{Data.beardStyle}</h6>
            </div>
          </div>
        </div>
        <hr />
        <p className="purple_title">Other Details</p>
        <div className="container-fluid ud_child">
          <div className="row">
            <div className="col-lg-3">
              <p>Languages</p>
              <h6>{Data.language}</h6>
            </div>
            <div className="col-lg-3">
              <p>Bold Scenesr</p>
              <h6>{Data.boldScenes === true? "Yes":"No" }</h6>
            </div>
            <div className="col-lg-3">
              <p>Allowances</p>
              <h6>{Data.allowances === true? "Yes":"No" }</h6>
            </div>
            <div className="col-lg-3">
              <p>Travelling</p>
              <h6>{Data.travelling === true? "Yes":"No" }</h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Talents;
