const { Router } = require('express');

const {getPokeHandler, getPokesHandler, postPokeHandler} = require ('../Handlers/pokeHandler')

const pokemonsRouter = Router();

pokemonsRouter.get("/", getPokesHandler);

pokemonsRouter.get("/:id", getPokeHandler);

pokemonsRouter.post("/", postPokeHandler);


module.exports = pokemonsRouter;