import React from "react";
import Popup from "reactjs-popup";
import "../../styles/CheckPopUp.css";

function CheckPopUp() {
  return (
    <Popup trigger={<button className="button"> Open Modal</button>} modal>
      {(close) => {
        console.log("triggered");
        return (
          <div className="modal">
            <button className="close" onClick={close}></button>
            <div className="header"> Modal Title </div>
            <div className="content">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a
              nostrum. Dolorem, repellat quidem ut, minima sint vel eveniet
              quibusdam voluptates delectus doloremque, explicabo tempore dicta
              adipisci fugit amet dignissimos?
            </div>
            <button
              className="button"
              onClick={() => {
                console.log("modal closed ");
                close();
              }}
            >
              close modal
            </button>
          </div>
        );
      }}
    </Popup>
  );
}

export default CheckPopUp;
