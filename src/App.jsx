import "./App.css";
import { useState } from "react";
// import CardContainer from "./components/CardContainer";
import PokemonCards from "./components/PokemonCards";
import "./stylesheets/ani.css";
let cardLength;

function App() {
  const [choseDiff, setChoseDiff] = useState(false);
  // let [playerName, setPlayerName] = useState("");
  let [cardNum, setCardNum] = useState();

  const handleBttnClick = (difficulty) => {
    setCardNum(difficulty);
    setChoseDiff(true);
    console.log(difficulty);
  };

  const handleInput = (event) => {
    setPlayerName(event.target.value);
  };

  return (
    <>
      {!choseDiff ? (
        <StartScreen
          choseDiff={choseDiff}
          setChoseDiff={setChoseDiff}
          handleBttnClick={handleBttnClick}
          handleInput={handleInput}
        />
      ) : (
        <>
          <div className="header">
            <h1>Pokemon Memory Game</h1>
            <div></div>
          </div>
          <PokemonCards cardNum={cardNum} />
        </>
      )}
    </>
  );
}

let StartScreen = ({ setChoseDiff, handleBttnClick, handleInput }) => {
  // add gradient thing later
  let button = document.querySelector(".diff-button");

  return (
    <div className="startScreen">
      <label htmlFor="name">Enter Your Name:</label>
      <input onChange={handleInput}></input>
      <div className="difficultyChoice">
        <p className="diffHead">Choose your difficulty</p>
        <button
          onClick={() => handleBttnClick(5)}
          className="diff-button"
          id="easy"
        >
          Easy
        </button>
        <button
          onClick={() => {
            handleBttnClick(10);
          }}
          className="diff-button"
          id="norm"
        >
          Normal
        </button>
        <button
          onClick={() => {
            handleBttnClick(20);
          }}
          className="diff-button"
          id="hard"
        >
          Hard
        </button>
      </div>
    </div>
  );
};

export default App;
