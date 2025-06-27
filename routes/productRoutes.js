const express = require('express');
const router = express.Router();

const {createProduct,deleteProductById,getAllProducts,getProductById,updateProductById} = require('../controllers/productController');


router.post('/',createProduct);
router.get('/',getAllProducts);
router.get('/:id',getProductById);
router.delete('/:id',deleteProductById);
router.put('/:id',updateProductById);

module.exports = router;
