const { Router } = require('express');
const router = Router();
const ProductManager = require('../controller/productManager');
const productManager = new ProductManager('product.json');


router.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    const {limit} = req.query
    const productLimit = products.slice(0, limit);
    
    res.json(productLimit);
})

router.get('/:pid', async(req, res) => {
    const {pid} = req.params
    const product = await productManager.getProductById(Number(pid))
    res.send(product)
})

router.post('/', async(req, res) => {
    const {title, description, price, thumbnail, code, stock} = req.body;
    const addProduct =  await productManager.addProducts(title, description, price, code, stock, thumbnail);
})

router.delete('/:pid', async(req, res) => {
    // TODO: Terminar validacion si existe un archivo por eliminar
    // TODO: Si el archivo se elimino correctamente lanzar un mensaje
    const {pid} = req.params;
    await productManager.deleteProduct(Number(pid));
    res.send('producto eliminado')
})

router.put('/:pid', async(req, res) => {
    const {pid} = req.params;
    const {title, description, price, code, stock} = req.body
    await productManager.updateProduct(Number(pid), title, description, price, code, stock);
    const product = await productManager.getProducts();
    res.send(product)
})




module.exports = router;