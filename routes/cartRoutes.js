const express = require('express');
const router = express.Router();

const {addToCart,clearCart,getCart,removeFromCart} = require('../controllers/cartController')

router.post('/add',addToCart);
router.post('/clear',clearCart);
router.get('/',getCart);
router.post('/remove',removeFromCart);

module.exports = router;
