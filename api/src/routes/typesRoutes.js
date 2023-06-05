const { Router } = require('express');

const getTypeHandler = require('../Handlers/typeHandler');

const typesRouter = Router();

typesRouter.get("/", getTypeHandler);

module.exports = typesRouter;