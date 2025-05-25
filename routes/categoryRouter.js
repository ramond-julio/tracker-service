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
categoryRouter.get(
    '/api/v1/categories/get-category/:id',
    isAuthenticated,
    categoryController.getCategory
);
categoryRouter.put(
    '/api/v1/categories/update/:id', 
    isAuthenticated,
    categoryController.update
);
categoryRouter.delete(
    '/api/v1/categories/delete/:id', 
    isAuthenticated,
    categoryController.delete
);

module.exports = categoryRouter;