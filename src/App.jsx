import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [gameCount, setGameCount] = useState(1);

  useEffect(() => {
    console.log("calling useEffect");
    const fetchPokemon = async () => {
      const tempArray = [];
      const promises = [];
      const numbers = new Set();

      while (numbers.size < 15) {
        const randomNum = Math.floor(Math.random() * 500) + 1;
        numbers.add(randomNum);
      }
      for (let item of numbers) {
        const promise = fetch(`https://pokeapi.co/api/v2/pokemon/${item}`)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);
            tempArray.push(data);
          });
        promises.push(promise);
      }
      await Promise.all(promises);
      setPokemon(tempArray);
    };

    fetchPokemon();
    console.log("useEffect end");
  }, [gameCount]);

  return (
    <>
      <div className="container">
        {pokemon.map((mon) => (
          <button key={mon} className="mon">
            <img key={mon} src={mon.sprites.front_default} />
          </button>
        ))}
      </div>
    </>
  );
}

export default App;
