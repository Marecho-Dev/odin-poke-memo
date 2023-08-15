import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [gameCount, setGameCount] = useState(1);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [polkeClickedTracker, setPokeClickedTracker] = [];

  const shufflePokemon = (pokeArray) => {
    for (let i = pokeArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pokeArray[i], pokeArray[j]] = [pokeArray[j], pokeArray[i]];
    }
    setPokemon(pokeArray);
  };

  const handleButtonClick = (mon) => {
    if (polkeClickedTracker.include(mon)) {
      console.log("fail");
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
        <div className="bestScore">Best Score: 0</div>
      </div>
      <div className="container">
        {pokemon.slice(0, 15).map((mon) => (
          <button
            onClick={handleButtonClick(mon)}
            key={mon.name}
            className="mon"
          >
            <img key={mon} src={mon.sprites.front_default} />
          </button>
        ))}
      </div>
    </>
  );
}

export default App;
