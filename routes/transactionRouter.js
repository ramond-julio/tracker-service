const express = require('express');
const transactionController = require('../controllers/transactionController');
const isAuthenticated = require('../middlewares/isAuthenticated');

const transactionRouter = express.Router();
transactionRouter.post(
    '/api/v1/transactions/create', 
    isAuthenticated,
    transactionController.create
);
transactionRouter.get(
    '/api/v1/transactions/lists', 
    isAuthenticated,
    transactionController.getFilteredTransactions
);


module.exports = transactionRouter;