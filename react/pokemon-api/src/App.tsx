import React from "react";
import PokemonList from "./components/PokemonList";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="container mt-4 bg-dark text-light p-4">
      <h1>Pokemon App</h1>
      <PokemonList />
    </div>
  );
};

export default App;
