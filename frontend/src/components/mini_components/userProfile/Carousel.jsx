import React from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

const Carousel = () => {
  let box = document.querySelector(".ec_child");
  const prevCon = () => {
    let width = box.offsetWidth;
    console.log(width);
    box.scrollLeft = box.scrollLeft - width;
  };
  const nextCon = () => {
    let width = box.offsetWidth;
    // console.log(width);

    box.scrollLeft = box.scrollLeft + width;
  };
  return (
    <>
      <div className="container-fluid experience_container">
        <div className="ec_child">
          <div>
            <h6>05/12/2018 - 01/12/2018</h6>
            <p>
              Supporting Actor, Milwaukee Repertory Theater Persued the role of
              Ensemble in Man of La Mancha.
            </p>
          </div>
          <div>
            <h6>2</h6>
            <p>
              Supporting Actor, Milwaukee Repertory Theater Persued the role of
              Ensemble in Man of La Mancha.
            </p>
          </div>
          <div>
            <h6>3</h6>
            <p>
              Supporting Actor, Milwaukee Repertory Theater Persued the role of
              Ensemble in Man of La Mancha.
            </p>
          </div>
          <div>
            <h6>4</h6>
            <p>
              Supporting Actor, Milwaukee Repertory Theater Persued the role of
              Ensemble in Man of La Mancha.
            </p>
          </div>
          <div>
            <h6>05</h6>
            <p>
              Supporting Actor, Milwaukee Repertory Theater Persued the role of
              Ensemble in Man of La Mancha.
            </p>
          </div>
          <div>
            <h6>6</h6>
            <p>
              Supporting Actor, Milwaukee Repertory Theater Persued the role of
              Ensemble in Man of La Mancha.
            </p>
          </div>
        </div>
        <div className="controllers">
          <button onClick={prevCon}>
            <BsChevronCompactLeft />
          </button>
          <button onClick={nextCon}>
            <BsChevronCompactRight />
          </button>
        </div>
      </div>
    </>
  );
};

export default Carousel;
