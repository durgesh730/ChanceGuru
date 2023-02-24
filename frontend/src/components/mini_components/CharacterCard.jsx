import React from "react";
import edit from "../../assets/icons/edit.svg";
import del from "../../assets/icons/delete.svg";

function CharacterCard({ index, cardData, toEdit, setToEdit }) {
  // console.log(cardData.name)
  // console.log(cardData.desc)

  return (
    <div className=" ud_child summaryChild ">
      <span className="w-100 my-2 d-flex justify-content-between align-items-center">
        <h6 className="m-0">
          {cardData.name +
            ": " +
            cardData.gender.toUpperCase() +
            " ," +
            cardData.age}
        </h6>
        <span>
          <span>
            <button
              className="mx-3"
              onClick={(e) => {
                e.preventDefault();
                setToEdit({ ...cardData, indexInChars: index });
                console.log(toEdit);
              }}
            >
              <img src={edit} alt="" />
            </button>
          </span>
          <span>
            <img src={del} alt="" />
          </span>
        </span>
      </span>

      <p className="m-0"> {cardData.desc} </p>
    </div>
  );
}

export default CharacterCard;
