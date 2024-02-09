const Router = require('express');
const categoryController = require("../controllers/category.controller");
const router = new Router();

router.get('/categories', categoryController.getCategories);
router.post('/categories', categoryController.createCategory);
router.put('/categories/:id', categoryController.updateCategory);
router.delete('/categories/:id', categoryController.deleteCategory);

module.exports = router;
