const { Pokemon, Type } = require('../db');
const axios = require('axios');

const formatPokemon = (pokemonData) => {
  const formattedPokemon = {
    id: pokemonData.id,
    name: pokemonData.name,
    image: pokemonData.sprites.front_default,
    vida: pokemonData.stats.find((stat) => stat.stat.name === 'hp').base_stat,
    ataque: pokemonData.stats.find((stat) => stat.stat.name === 'attack').base_stat,
    defensa: pokemonData.stats.find((stat) => stat.stat.name === 'defense').base_stat,
    velocidad: pokemonData.stats.find((stat) => stat.stat.name === 'speed')?.base_stat,
    altura: pokemonData.height,
    peso: pokemonData.weight,
    types: pokemonData.types.map((type) => type.type.name),
    created: false,
  };
  return formattedPokemon;
};

const getAllPokemons = async (name) => {
  let apiPokemon = [];
  let formattedApiPokemon = [];

  if (!name) {
    apiPokemon = (await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=100`)).data.results;
  } else {    
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const pokemonData = response.data;
      const formattedPokemon = formatPokemon(pokemonData);
      formattedApiPokemon.push(formattedPokemon);    
  };

  let bddPokemon = [];
  if (name) {
    bddPokemon = await Pokemon.findAll({
      where: {
        name: name.toLowerCase(),
      },
      include: Type,
    });
  } else {
    bddPokemon = await Pokemon.findAll({ include: Type });
  };

  if (!name) {
    formattedApiPokemon = await Promise.all(apiPokemon.map(async (pokemon) => {      
        const response = await axios.get(pokemon.url);
        const pokemonData = response.data;
        const formattedPokemon = formatPokemon(pokemonData);
        return formattedPokemon;
       
     }));
   }
  const allPokemon = [...bddPokemon, ...formattedApiPokemon];
  return allPokemon;
 };

const getPokemonId = async (id, source) => {
    let pokemon;
    if (source === 'bdd') {
      pokemon = await Pokemon.findByPk(id, { include: Type });
    } else {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const pokemonData = response.data;
      pokemon = formatPokemon(pokemonData);
      pokemon.types = pokemonData.types.map((type) => type.type.name);
    }
    return pokemon;
  };

  const createPokemon = async (name, vida, ataque, defensa, velocidad, altura, peso, image, types) => {
    try {
      const pokemon = await Pokemon.create({
        name,
        vida,
        ataque,
        defensa,
        velocidad,
        altura,
        peso,
        image,
        types,        
      });
  
      if (types && types.length > 0) {
        const typeNames = types; // Obtén los nombres de los tipos desde el frontend
        const foundTypes = await Type.findAll({ where: { name: typeNames } }); // Busca los tipos por nombre
        await pokemon.setTypes(foundTypes); // Asigna los tipos encontrados al Pokemon
      }
  
      return pokemon;
    } catch (error) {
      throw new Error('Error creating pokemon');
    }
  };

  module.exports = {
    createPokemon,
    getPokemonId,
    getAllPokemons,
  };
