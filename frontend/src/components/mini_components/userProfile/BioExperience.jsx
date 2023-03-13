import React from "react";
import Carousel from "./Carousel";

const BioExperience = ({ Data }) => {
  console.log(Data)
  return (
    <>
      <div className="userdetails d-flex justify-content-between flex-column">
        <div className="container-fluid ud_child">
          <div className="row">
            <div className="mb-4">
              <p>About me</p>
              <h6>{!Data.bio ? "null" : Data.bio}</h6>
            </div>
            <div>
              <p>Experience</p>
              <div className="scroll_x">
                {/* {Data.experience?.map((i) => {
                  // console.log(i)
                  return (
                    <div className="x_cards">
                      <h6>
                        {i.startDate} - {i.endDate}
                      </h6>
                      <p>{i.aboutWork}</p>
                    </div>
                  );
                })} */}
                <Carousel Data={Data}/>

                {/* <div className="x_cards">
                  <h6>05/12/2018 - 01/12/2018</h6>
                  <p>
                    Supporting Actor, Milwaukee Repertory Theater Persued the
                    role of Ensemble in Man of La Mancha.
                  </p>
                </div> */}
                {/* <div className="x_cards">
                  <h6>05/12/2018 - 01/12/2018</h6>
                  <p>
                    Supporting Actor, Milwaukee Repertory Theater Persued the
                    role of Ensemble in Man of La Mancha.
                  </p>
                </div> */}
                {/* <div className="x_cards">
                  <h6>05/12/2018 - 01/12/2018</h6>
                  <p>
                    Supporting Actor, Milwaukee Repertory Theater Persued the
                    role of Ensemble in Man of La Mancha.
                  </p>
                </div> */}
                {/* <div className="x_cards">
                  <h6>05/12/2018 - 01/12/2018</h6>
                  <p>
                    Supporting Actor, Milwaukee Repertory Theater Persued the
                    role of Ensemble in Man of La Mancha.
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BioExperience;
