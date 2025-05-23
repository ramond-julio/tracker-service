const express = require('express');
const isAuthenticated = require('../middlewares/isAuthenticated');
const categoryController = require('../controllers/categoryController')

const categoryRouter = express.Router();
categoryRouter.post(
    '/api/v1/categories/create', 
    isAuthenticated,
    categoryController.create
);
categoryRouter.get(
    '/api/v1/categories/lists', 
    isAuthenticated,
    categoryController.list
);

module.exports = categoryRouter;