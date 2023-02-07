const { Router } = require('express');
const router = Router();
const CartManager = require('../controller/cartManager');
const cartManager = new CartManager('cart.json');

router.post('/', async(req, res) => {
    // TODO: validar id unico en CartManager
    const {productos} = req.body;
    await cartManager.addCart(productos);

})

router.get('/:cid')

module.exports = router;