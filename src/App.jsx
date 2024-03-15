import "./App.css";
import { useState } from "react";
// import CardContainer from "./components/CardContainer";
import PokemonCards from "./components/PokemonCards";
import "./stylesheets/ani.css";
import "./index.css";
let cardLength;

function App() {
  const [choseDiff, setChoseDiff] = useState(false);
  let [cardNum, setCardNum] = useState();

  const handleBttnClick = (difficulty) => {
    console.log(difficulty);

    setCardNum(difficulty);
    setChoseDiff(true);
  };

  return (
    <>
      {!choseDiff ? (
        <StartScreen
          choseDiff={choseDiff}
          setChoseDiff={setChoseDiff}
          handleBttnClick={handleBttnClick}
        />
      ) : (
        <>
          <div className="header">
            <h1>Pokemon Memory Game</h1>
            <div></div>
          </div>
          <PokemonCards cardNum={cardNum} setChoseDiff={setChoseDiff} />
        </>
      )}
    </>
  );
}

let StartScreen = ({ setChoseDiff, handleBttnClick }) => {
  // add gradient thing later
  let button = document.querySelector(".diff-button");

  return (
    <div className="startScreen">
      <div className="difficultyChoice">
        <h2 className="diffHead">Choose your difficulty</h2>
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
