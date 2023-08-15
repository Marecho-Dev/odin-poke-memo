import { useState, useEffect } from "react";
import "./App.css";

function App() {
  //array for all pokemon in current game session
  const [pokemon, setPokemon] = useState([]);
  //game count used to track how many games you've played. Dependency for fetchPokemon useEffect
  const [gameCount, setGameCount] = useState(1);
  //0 for active game, 1 for new game screen
  const [winnerStatus, setWinnerStatus] = useState("");
  const [gameOver, setGameOver] = useState(0);
  //currentScore tracks currentScore
  const [currentScore, setCurrentScore] = useState(0);
  //bestScore tracks high score
  const [bestScore, setBestScore] = useState(0);
  //pokeClickedTracker will track which pokemon have already been clicked in the current sesh
  const [pokeClickedTracker, setPokeClickedTracker] = useState([]);

  const shufflePokemon = (pokeArray) => {
    for (let i = pokeArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pokeArray[i], pokeArray[j]] = [pokeArray[j], pokeArray[i]];
    }
    setPokemon(pokeArray);
  };
  const newGame = () => {
    setGameOver(0);
    setCurrentScore(0);
    setGameCount(gameCount + 1);
  };
  const handleButtonClick = (mon) => {
    let temp = pokeClickedTracker;
    if (temp.includes(mon)) {
      setGameOver(1);
      setWinnerStatus("GAME OVER");
    } else {
      temp.push(mon);
      setPokeClickedTracker(temp);
      setCurrentScore(currentScore + 1);
      if (currentScore + 1 > bestScore) {
        setBestScore(currentScore + 1);
      }
      if (currentScore + 1 == 18) {
        setGameOver(1);
        setWinnerStatus("YOU WIN");
      }
      shufflePokemon(pokemon);
    }
  };
  useEffect(() => {
    const fetchPokemon = async () => {
      const tempArray = [];
      const promises = [];
      const numbers = new Set();

      while (numbers.size < 20) {
        const randomNum = Math.floor(Math.random() * 500) + 1;
        numbers.add(randomNum);
      }
      for (let item of numbers) {
        const promise = fetch(`https://pokeapi.co/api/v2/pokemon/${item}`)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data.name);
            tempArray.push(data);
          });
        promises.push(promise);
      }
      await Promise.all(promises);
      setPokemon(tempArray);
    };

    fetchPokemon();
  }, [gameCount]);

  return (
    <>
      <div className="scores">
        <div className="currentScore">Current Score: {currentScore}</div>
        <div className="bestScore">Best Score: {bestScore}</div>
      </div>
      {gameOver == 0 && (
        <div className="container">
          {pokemon.slice(0, 15).map((mon) => (
            <button
              onClick={() => handleButtonClick(mon)}
              key={mon.name}
              className="mon"
            >
              <img key={mon} src={mon.sprites.front_default} />
            </button>
          ))}
        </div>
      )}
      {gameOver == 1 && (
        <div className="gameOverContainer">
          <div className="gameOver">{winnerStatus}</div>
          <button onClick={newGame}>new game</button>
        </div>
      )}
    </>
  );
}

export default App;
