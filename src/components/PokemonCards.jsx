import { React, useState, useEffect } from "react";
import axios from "redaxios";
import PokemonCard from "./PokemonCard";
import "../stylesheets/ani.css";
import "../index.css";

const PokemonCards = ({ cardNum, setChoseDiff }) => {
  console.log(cardNum);
  const [pokemons, setPokemons] = useState([]);
  const [clickedOrders, setClickedOrders] = useState([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [wonGame, setWonGame] = useState(false);
  let cardContainer = document.querySelector(".card-container");
  let cardDiv = document.getElementById("cardGame");
  let highScoreDiv = document.querySelector(".high-score");
  let header = document.querySelector(".header");

  useEffect(() => {
    handleWonGame();
  }, [currentScore]);

  const newGame = () => {
    console.log(cardContainer);
    setClickedOrders([]);
    cardDiv.classList.remove("lost-game");
    cardDiv.classList.add("card-container");
    setCurrentScore(0);
    setIsPlaying(true);
  };

  const lostGame = () => {
    const otherThing = document.querySelector(".card-container");
    otherThing.classList.remove("card-container");
    cardContainer.classList.add("lost-game");
    setIsPlaying(false);
    if (currentScore > highScore) {
      setHighScore(currentScore);
    }
  };

  const handleWonGame = () => {
    if (currentScore >= cardNum) {
      header.setAttribute("id", "gradient");
      setWonGame(true);
    }
  };

  // Fisher Yates Shuffle
  const shuffleCards = () => {
    const shuffledCards = [...pokemons];
    for (let i = shuffledCards.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1));
      [shuffledCards[i], shuffledCards[rand]] = [
        shuffledCards[rand],
        shuffledCards[i],
      ];
    }
    setPokemons(shuffledCards);
  };

  // Shuffles cards, sends clicked card to array, checks if array contains duplicates
  const handleClick = (order) => {
    shuffleCards();
    console.log(wonGame);
    let singleCards = document.querySelectorAll(".card");
    let cardDivs = [...singleCards];
    cardDivs.forEach((cardItem) => {
      cardItem.classList.add("spin-x");
      setTimeout(() => {
        cardItem.classList.remove("spin-x");
      }, 200);
    });

    // if the length of the array is equal to the
    if (!clickedOrders.includes(order)) {
      setClickedOrders((prevClickedOrders) => [...prevClickedOrders, order]);
      setCurrentScore((prevScore) => prevScore + 1);
      if (clickedOrders.length == cardNum) {
        setWonGame(true);
      }
      console.log("currentScore", currentScore);
    } else {
      lostGame();
      console.log("High Score", highScore);
    }
  };
  useEffect(() => {
    const fetchPokemons = async () => {
      const promises = [];
      for (let i = 1; i <= cardNum; i++) {
        promises.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`));
      }

      try {
        const responses = await Promise.all(promises);
        const pokemonsData = responses.map((response) => ({
          name: response.data.name,
          image: response.data.sprites.front_default,
          order: response.data.order,
        }));
        setPokemons(pokemonsData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPokemons();
  }, []);
  // Allows the cards to shuffle upon first state change, rather than omitting.
  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    console.log("clickedOrders", clickedOrders);
  }, [clickedOrders]);

  return (
    <>
      {!wonGame ? (
        <div className="Main">
          <div className="game-score">
            <b style={{ display: highScore == 0 ? "none" : "block" }}>
              High Score: {highScore}
            </b>
            <b className="current-score">Current Score: {currentScore}</b>
          </div>
          <div id="cardGame" className="card-container">
            {isPlaying ? (
              // Render Pokemon cards when game is ongoing
              pokemons.map((pokemon, index) => {
                return (
                  <PokemonCard
                    key={index}
                    name={pokemon.name}
                    image={pokemon.image}
                    order={pokemon.order}
                    onClick={handleClick}
                  />
                );
              })
            ) : (
              // Render "YOU LOSE!" message when game is over
              <div>
                <h2>You hit a duplicate card!</h2>
                <button onClick={() => newGame()}>Start a new game</button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="youWon">
          <h1>Let's go! You got all cards!</h1>
          <button
            onClick={() => {
              setChoseDiff(false);
            }}
          >
            Change Difficulty
          </button>
        </div>
      )}
    </>
  );
};

export default PokemonCards;
