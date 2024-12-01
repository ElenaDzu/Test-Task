import React from "react";

function Card() {
  return (
    <>
        <div className="card">
            <h2 className="card__title">Projects:</h2>
            <div className="card__block">
                <p className="card__text">Create project</p>
                <button className="card__create-button">&#43;</button>
            </div>
        </div>
        <div className="card">
            <h2 className="card__title">Tasks:</h2>
            <div className="card__block">
                <p className="card__text">Create task</p>
                <button className="card__create-button">&#43;</button>
            </div>
        </div>    
    </>
  );
}

export default Card;