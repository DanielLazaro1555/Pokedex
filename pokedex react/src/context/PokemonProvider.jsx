import { useEffect, useState } from "react";
import { PokemonContext } from "./PokemonContext";

export const PokemonProvider = ({ children }) => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [globalPokemons, setGlobalPokemons] = useState([]);
  const [offset, setOffset] = useState(0);

  //Llamar 50 pokemones a la API - No olvidar el "/"

  const getAllPokemons = async (limit = 50) => {
    const baseURL = "https://pokeapi.co/api/v2";
    const res = await fetch(
      `${baseURL}/pokemon?limit=${limit}&offset=${offset}`
    );
    const data = await res.json();

    const promises = data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      const data = await res.json();
      return data;
    });
    const results = await Promise.all(promises);
    setAllPokemons(results);
  };

  //Llamar todos los pokemones a la API - Poner 1000000 para obtener todos los pokemones
  const getGlobalPokemons = async () => {
    const baseURL = "https://pokeapi.co/api/v2";
    const res = await fetch(`${baseURL}/pokemon?limit=100000&offset=0`);
    const data = await res.json();

    const promises = data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      const data = await res.json();
      return data;
    });
    const results = await Promise.all(promises);
    setAllPokemons(results);
  };

  useEffect(() => {
    getAllPokemons();
  }, []);

  useEffect(() => {
    getGlobalPokemons();
  }, []);

  return (
    <PokemonContext.Provider
      value={{
        numero: 0,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
