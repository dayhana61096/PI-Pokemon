import React from 'react';
import Card from '../Card/Card';
import style from './CardsContainer.module.css';

const CardContainer = ({ currentPage, pokemonsPerPage, pokemons }) => {  
 
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

  return (
    <div className={style.container}>
      {currentPokemons.map((pokemon) => (
        <Card
          key={pokemon.id}
          id={pokemon.id}
          name={pokemon.name}
          vida={pokemon.vida}
          ataque={pokemon.ataque}
          defensa={pokemon.defensa}
          velocidad={pokemon.velocidad}
          altura={pokemon.altura}
          peso={pokemon.peso}
          image={pokemon.image}
          types={pokemon.Types?pokemon.Types:pokemon.types}
        />
      ))}
    </div>
  );
};

export default CardContainer;
