const { Router } = require('express');
const router = Router();
const CartManager = require('../controller/cartManager');
const cartManager = new CartManager('cart.json');

router.post('/', async(req, res) => {
    const {productos} = req.body;
    await cartManager.addCart(productos);

})

router.get('/:cid', async(req, res) => {
  const {cid} = req.params;
  const products = await cartManager.getProductsByCart(Number(cid));
  res.send(products)  
})

router.post('/:cid/product/:pid', async(req, res) => {
    const {cid, pid} = req.params;
    await cartManager.addProductToCart(Number(cid), Number(pid))
})

module.exports = router;