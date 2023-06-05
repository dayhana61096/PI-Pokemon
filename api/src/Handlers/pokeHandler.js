const { createPokemon, getPokemonId, getAllPokemons} = require("../Controllers/pokemonControllers");

const getPokesHandler = async (req, res) => {
    const { name } = req.query;
  
    try {
      const results = await getAllPokemons(name);
      res.status(200).json(results) 
    } catch (error) {
      res.status(400).json({ error: "No existe un pokemon con este nombre" });
    }
  };

const getPokeHandler = async (req, res)=>{
    const {id} = req.params;

    const source = isNaN(id) ? "bdd" : "api";
    
    try {
        const pokemon = await getPokemonId (id, source);
        res.status(200).json(pokemon);        
    } catch (error) {
        res.status(400).json({error: error.message});        
    }    
};

const postPokeHandler = async (req, res) => {
    const { name, vida, ataque, defensa, velocidad, altura, peso, image, types } = req.body;
  
    try {
      await createPokemon(name, vida, ataque, defensa, velocidad, altura, peso, image, types);
      res.status(201).json({ message: 'Pokemon created successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };


module.exports = {
    getPokeHandler, getPokesHandler, postPokeHandler
};

