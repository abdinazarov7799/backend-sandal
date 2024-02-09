const Router = require('express');
const roleController = require("../controllers/role.controller");
const router = new Router();

router.get('/roles', roleController.getRoles);
router.post('/roles', roleController.createRole);
router.put('/roles/:id', roleController.updateRole);
router.delete('/roles/:id', roleController.deleteRole);

module.exports = router;
