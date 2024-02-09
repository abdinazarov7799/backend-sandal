const Router = require('express');
const orderController = require("../controllers/order.controller");
const router = new Router();

router.get('/orders', orderController.getOrders);
router.get('/orders/:id', orderController.getOneOrder);
router.post('/orders', orderController.createOrder);
router.post('/orders/accept', orderController.acceptOrder);
router.post('/orders/reject', orderController.rejectOrder);
router.get('/user-orders', orderController.getOrdersByUserId);

module.exports = router;
