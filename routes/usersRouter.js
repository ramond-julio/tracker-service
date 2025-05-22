const express = require('express');
const usersController = require('../controllers/usersController');

const usersRouter = express.Router();
usersRouter.post('/api/v1/users/register', usersController.register);

module.exports = usersRouter;