const asyncHandler = require('express-async-handler');
const Transaction = require('../model/Transactions');

//Categories handler
const transactionController = {
    //Add
    create: asyncHandler(async(req, res) => {
        const { type,category,amount,date,description } = req.body;
        if(!amount || !type || !date){
            throw new Error('Type, amount and date are required')
        }
        const transaction = await Transaction.create({
            user: req.user,
            type,
            category,
            amount,
            description
        });
        res.status(201).json(transaction);
    }),

    //list
    getFilteredTransactions: asyncHandler(async(req,res) => {
        const { startDate, endDate, type, category} = req.query;
        let filters = { user: req.user };
        if(startDate){
            filters.date = {...filters.date, $gte: new Date(startDate)};
        }
        if(endDate){
            filters.date = {...filters.date, $lte: new Date(endDate)};
        }
        if(type){
            filters.type=type;
        }
        if(category){
            if(category === 'All'){

            } else if(category === 'Uncategorized'){
                filters.category = 'Uncategorized';
            } else {
                filters.category = category;
            }
        }
         const transactions = await Transaction.find(filters).sort({date:-1});
        res.json(transactions);
    }),

    //Update
    update: asyncHandler(async(req,res) => {
    }),

    //Delete
    delete: asyncHandler(async(req,res) => {
    }),
}

module.exports = transactionController;