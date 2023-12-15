import React, { useState, useEffect } from "react";
import axios from "axios";
const url = "https://pokeapi.co/api/v2/pokemon/";

interface Pokemon {
  name: string;
}

// Styling was not in the scope of the test. If you are going to add styling, do it using a layout that makes
// sense and it's responsive. The layout is weird and not very friendly in mobile devices

const PokemonList: React.FC = () => {
  // Having two states for pokemonList, one filtered and one unfiltered is a bad practice. Whenever you have "derived" states
  // from another state, it's best to calculate them at the time of use, not to have them duplicated
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  // ??? This state is redundant. You are not using valorInput for anything
  // const [valorInput, setValorInput] = useState("");

  // Using the right state variables
  const [query, setQuery] = useState("");
  const [isSortedAsc, setIsSortedAsc] = useState(false);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await axios.get(url);
        const list = response.data.results.map((pokemon: { name: string }) => ({
          name: pokemon.name,
        }));
        setPokemonList(list);
      } catch (error) {
        console.error("Error fetching Pokémon list:", error);
      }
    };
    fetchPokemonList();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSort = () => {
    setIsSortedAsc(!isSortedAsc);
  };

  // filteredPokemonList is no longer a state variable, it's calculated on each render.
  // If this were something costly and we had more state variables that trigger re-renders
  // it could be optimized with useMemo, but that's not the case.
  // Debouncing the search input would also be a good idea, use-debounce is a good library for that
  const filteredPokemonList = pokemonList
    .filter((pokemon) =>
      pokemon.name.toLowerCase().includes(query.toLowerCase())
    )
    .sort((a, b) => {
      if (isSortedAsc) return a.name.localeCompare(b.name);
      return 0; // Not sorted
    });

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
      <input
        type="checkbox"
        checked={isSortedAsc}
        onChange={handleSort}
        className="sort-button"
      />
      {/* I miss a loading state or a "no results" message
        when there are no results. I also don't see what happens
        if the API call fails, the user is not informed */}
      <ul className="pokemon-list">
        {filteredPokemonList.map((pokemon) => (
          <li key={pokemon.name}>{pokemon.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;
