const axios = require('axios');
const { Type } = require('../db');

const getAllTypes = async () => {
    const response = await axios.get('https://pokeapi.co/api/v2/type?limit=100');
    const types = response.data.results.map((type) => type.name);
    return types;  
};

const saveTypesToDatabase = async (types) => {  
    for (const type of types) {
      await Type.findOrCreate({ where: { name: type } });
    };
};

const getAllPokemonTypes = async () => {
  let types = await Type.findAll({ attributes: ['name'] });

  if (!types.length) {
    types = await getAllTypes();
    await saveTypesToDatabase(types);
  };
  return types;
};

module.exports = {
    getAllPokemonTypes: getAllPokemonTypes,
  };
