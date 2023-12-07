import React, { useState, useEffect } from "react";
import axios from "axios";
const url = "https://pokeapi.co/api/v2/pokemon/";

interface Pokemon {
  name: string;
}

const PokemonList: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState<Pokemon[]>([]);
  const [valorInput, setValorInput] = useState("");

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await axios.get(url);
        const list = response.data.results.map((pokemon: { name: string }) => ({
          name: pokemon.name,
        }));
        setPokemonList(list);
        setFilteredPokemonList(list);
      } catch (error) {
        console.error("Error fetching Pokémon list:", error);
      }
    };
    fetchPokemonList();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setValorInput(query);
    const filteredList = pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPokemonList(filteredList);
  };

  const orderByAlph = () => {
    const orderedList = [...filteredPokemonList].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setFilteredPokemonList(orderedList);
  };

  return (
    <div className="main-content">
      <h2 className="text-center mb-4">Pokemon List</h2>
      <div className="input-group flex-nowrap mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search Pokemon"
          aria-label="Search Pokemon"
          aria-describedby="addon-wrapping"
          onChange={handleSearch}
        />
      </div>
      <button type="button" className="sort-button" onClick={orderByAlph}>
        Order
      </button>
      <ul className="pokemon-list">
        {filteredPokemonList.map((pokemon) => (
          <li key={pokemon.name}>{pokemon.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;
