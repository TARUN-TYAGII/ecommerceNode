const Product = require('../models/Product');

// create product
// get all products
// get product by id
// update product by id
// delete product by id

exports.createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({message : 'Error creating product', error : error.message});
    }
}


exports.getAllProducts = async (req,res) =>{
    try{
        const products = await Product.find().populate('category');
        res.status(200).json(products);
    }catch(err){
        res.status(500).json({message : 'Error fetching products', error : err.message});
    }
}

exports.getProductById = async(req,res) =>{
    try{
        const id = req.params.id;
        const product = Product.findById(id).populate('category');
        if(!product){
            return res.status(404).json({message : 'Product not found'});
        }
        res.status(200).json(product)

    }catch(err){
    res.status(500).json({message : 'Error fetching product', error : err.message});
    }
}

exports.deleteProductById = async (req,res) =>{
    try{
        const id = req.params.id;
        const product = Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message:"Product not found"});
        }
        res.status(200).json({message:"Product deleted successfully"});
    }catch(err){
        res.status(500).json({message:"Error deleting product", error : err.message});
    }
}

exports.updateProductById = async (req,res) =>{
    try{
        const id = req.params.id;
        const product = Product.findByIdAndUpdate(id , res.body, {new:true});
        if(!product){
            return res.status(404).json({message:"Product not found"});
        }
        res.status(200).json({message:"Product updated successfully", product});
    }catch(error){
        res.status(500).json({message:"Error updating product", error : error.message});
    }
}



