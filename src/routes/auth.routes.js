const Router = require('express');
const authController = require("../controllers/auth.controller");
const router = new Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/getMe', authController.getMe);

module.exports = router;
