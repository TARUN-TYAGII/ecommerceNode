const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
    try {
        const {name} = req.body;
        const category = new Category({name});
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({message : 'Error creating category', error : error.message});
    }
}

exports.getAllCategories = async (req, res) => {
    try{
        const categories = await Category.find();
        res.status(200).json(categories);
    }catch(error){
        res.status(500).json({message : 'Error fetching categories', error : error.message});
    }
    
}