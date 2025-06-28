const Cart = require('../models/cart');

exports.addToCart = async (req,res) =>{
    try{
        const {userId, productId, quantity} = req.body;

        let cart = await Cart.findOne({userId});
        if(!cart){
            cart = await Cart.create({userId, items : []});
        }

        const itemIndex = cart.items.findIndex(i => i.product.toString() === productId);
        if(itemIndex > -1){
            cart.items[itemIndex].quantity += quantity;
        }else{
            cart.items.push({product : productId, quantity});
        }

        await cart.save();
        res.status(200).json(cart);
    }
    catch(error){
        res.status(500).json({error : error.message});
    }
}

exports.getCart = async (req,res) =>{
    try{
        const {userId} = req.userId;
        const cart = await Cart.findOne({userId}).populate('items.product');
        if(!cart){
            throw new Error('Cart not found');
        }
        res.status(200).json(cart);
    }
    catch(error){
        res.status(500).json({error : error.message});
    }
}


exports.removeFromCart = async (req,res) =>{
    try{
        const {userId, productId} = req.body;
        const cart = await Cart.findOne({userId});
        if(!cart){
            throw new Error('Cart not found');
        }
        cart.items = cart.items.filter(i => i.product.toString() !== productId);
        await cart.save();
        res.status(200).json(cart);
        
    }catch(error){
        res.status(500).json({error : error.message});
    }
}


exports.clearCart = async (req,res) =>{
    try{
        const {userId} = req.userId;
        const cart = await Cart.findOne({userId});
        if(!cart){
            throw new Error('Cart not found');
        }
        cart.items = [];
        await cart.save();
        res.status(200).json(cart);
    }
    catch(error){
        res.status(500).json({error : error.message});
    }
}