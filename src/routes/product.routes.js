const Router = require('express');
const productController = require("../controllers/product.controller");
const router = new Router();

router.get('/products', productController.getProducts);
router.get('/products/:id', productController.getOneProduct);
router.post('/products', productController.createProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
