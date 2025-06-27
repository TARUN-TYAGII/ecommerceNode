const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name : String,
    description : String,
    price : Number,
    stock : {type : Number, default : 0},
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Category',
        required : true
    }
}, {timestamps: true})

module.exports =  mongoose.model('Product', productSchema);