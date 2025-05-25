const asyncHandler = require('express-async-handler');
const Category = require('../model/Category');
const Transactions = require('../model/Transactions');

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

    //Get Category By Id
    getCategory: asyncHandler(async(req,res) => {
        console.log('called')
        console.log(req.params.id)
        const categoryId = req.params.id;
        const category = await Category.findById(categoryId);
        res.status(200).json({ name: category.name, type: category.type});
    }),

    //list
    list: asyncHandler(async(req,res) => {
        const categories = await Category.find({ user: req.user });
        res.status(200).json(categories);
    }),

    //Update
    update: asyncHandler(async(req,res) => {
        const categoryId = req.params.id;
        const{ type, name } = req.body;
        const category = await Category.findById(categoryId);
        if(!category && category.user.toString() !== req.user.toString()){
            throw new Error('Category not found or user not authorized')
        }
        const oldName = category.name;
        category.name = name || category.name;
        category.type = type || category.type;
        const updatedCategory = await category.save();
        if(oldName !== updatedCategory.name){
            await Transactions.updateMany(
                {
                user: req.user,
                category: oldName
                },
                {$set:{category: updatedCategory.name}}
            )
        }
        res.json(updatedCategory);
    }),

    //Delete
    delete: asyncHandler(async(req,res) => {
        const categoryId = req.params.id;
        const category = await Category.findById(categoryId);
         if(category && category.user.toString() === req.user.toString()){
            const defaultCategory = 'Uncategorized';
            await Transactions.updateMany(
                {user: req.user, category: category.name},
                {$set: {category: defaultCategory}}
            );
            await Category.findByIdAndDelete(req.params.id);
            res.json({ message: "Category removed and transactions updated"});
        } else {
            res.json({ message: 'Category not found or user not authorized'});
        }
    }),
}

module.exports = categoryController;