const Router = require('express');
const userController = require("../controllers/user.controller");
const router = new Router();

router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getOneUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
