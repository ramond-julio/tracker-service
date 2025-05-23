const express = require('express');
const usersController = require('../controllers/usersController');
const isAuthenticated = require('../middlewares/isAuthenticated');

const usersRouter = express.Router();
usersRouter.post('/api/v1/users/register', usersController.register);
usersRouter.post('/api/v1/users/login', usersController.login);
usersRouter.get(
    '/api/v1/users/profile',
    isAuthenticated, 
    usersController.profile
);

module.exports = usersRouter;