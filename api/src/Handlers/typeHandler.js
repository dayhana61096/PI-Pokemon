const { getAllPokemonTypes } = require('../Controllers/typesControllers');

const getTypeHandler = async (req, res) => {
  try {
    const types = await getAllPokemonTypes();
    res.status(200).json(types);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getTypeHandler;



