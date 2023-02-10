import React from "react";
import Carousel from "./Carousel";

const BioExperience = () => {
  return (
    <>
      <div className="userdetails d-flex justify-content-between flex-column">
        <div className="container-fluid ud_child">
          <div className="row">
            <div className="mb-4">
              <p>About me</p>
              <h6>
                I am originally from the cornfields of DeKalb, IL, where I grew
                up homeschooled alongside my five siblings. After graduating
                Summa Cum Laude from Northern Illinois University with a BFA in
                Acting, I moved to Chicago to join the vibrant, generous, and
                exciting theatre community here, and have loved every minute of
                it!
              </h6>
            </div>
            <div>
              <p>Experience</p>
              {/* <div className="scroll_x">
                <div className="x_cards">
                  <h6>05/12/2018 - 01/12/2018</h6>
                  <p>
                    Supporting Actor, Milwaukee Repertory Theater Persued the
                    role of Ensemble in Man of La Mancha.
                  </p>
                </div>
                <div className="x_cards">
                  <h6>05/12/2018 - 01/12/2018</h6>
                  <p>
                    Supporting Actor, Milwaukee Repertory Theater Persued the
                    role of Ensemble in Man of La Mancha.
                  </p>
                </div>
                <div className="x_cards">
                  <h6>05/12/2018 - 01/12/2018</h6>
                  <p>
                    Supporting Actor, Milwaukee Repertory Theater Persued the
                    role of Ensemble in Man of La Mancha.
                  </p>
                </div>
                <div className="x_cards">
                  <h6>05/12/2018 - 01/12/2018</h6>
                  <p>
                    Supporting Actor, Milwaukee Repertory Theater Persued the
                    role of Ensemble in Man of La Mancha.
                  </p>
                </div>
                <div className="x_cards">
                  <h6>05/12/2018 - 01/12/2018</h6>
                  <p>
                    Supporting Actor, Milwaukee Repertory Theater Persued the
                    role of Ensemble in Man of La Mancha.
                  </p>
                </div>
              </div> */}
              <Carousel />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BioExperience;
