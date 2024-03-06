import "./App.css";
import { useState } from "react";
// import CardContainer from "./components/CardContainer";
import PokemonCards from "./components/PokemonCards";

function App() {
  return (
    <>
      <div className="header">
        <h1>Pokemon Memory Game</h1>
        <div></div>
      </div>
      <PokemonCards />
    </>
  );
}

export default App;
