import "../stylesheets/cards.css";
import { useState } from "react";

const PokemonCard = ({ name, image, order, onClick }) => {
  const handleClick = () => {
    onClick(order);
  };
  return (
    <div className="card">
      <div
        onClick={() => {
          handleClick();
        }}
        key={order}
        className="card-body"
      >
        <p>{name}</p>
        <div className="img-container">
          <img src={image} alt={name} />
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
