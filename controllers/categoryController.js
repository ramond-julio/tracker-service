const asyncHandler = require('express-async-handler');
const Category = require('../model/Category');

//Categories handler
const categoryController = {
    //Add
    create: asyncHandler(async(req, res) => {
        const { name,type } = req.body;
        if(!name || !type){
            throw new Error('Name and type are required for creating category')
        }
        const normalizedName = name.toLowerCase();
        const validTypes = ['income','expense'];
        if(!validTypes.includes(type.toLowerCase())){
            throw new Error('Invalid category type' + type);
        }
        const categoryExists = await Category.findOne({
            name:normalizedName,
            user: req.user
        });
        if(categoryExists){
            throw new Error(`Category ${categoryExists.name} already exists in the database`);
        }
        const category = await Category.create({
            name: normalizedName,
            user: req.user,
            type
        });
        res.status(201).json(category);
    }),

    //list
    list: asyncHandler(async(req,res) => {
        const categories = await Category.find({ user: req.user });
        res.status(200).json(categories);
    }),

    //Update
    update: asyncHandler(async(req,res) => {
    }),

    //Delete
    delete: asyncHandler(async(req,res) => {
    }),
}

module.exports = categoryController;