import React, { useEffect, useRef } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

const Carousel = ({Data}) => {
  const slideDiv = useRef("");

  // let width = box.offsetWidth;
  // console.log(box.offsetWidth);

  const prevCon = () => {
    let width = slideDiv.current.offsetWidth;
    slideDiv.current.scrollLeft = slideDiv.current.scrollLeft - width;
    console.log(slideDiv);
  };
  const nextCon = () => {
    let width = slideDiv.current.offsetWidth;
    slideDiv.current.scrollLeft = slideDiv.current.scrollLeft + width;
  };
  return (
    <>
      <div className="container-fluid experience_container">
        <div className="ec_child" ref={slideDiv}>
          {Data.experience?.map((i) => {
            // console.log(i)
            return (
              <div>
                <h6>{i.startDate} - {i.endDate}</h6>
                <p>
                  {i.aboutWork}
                </p>
              </div>
            )
          })}
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
