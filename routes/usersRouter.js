const express = require('express');
const usersController = require('../controllers/usersController');

const usersRouter = express.Router();
usersRouter.post('/api/v1/users/register', usersController.register);
usersRouter.post('/api/v1/users/login', usersController.login);

module.exports = usersRouter;