const Router = require('express');
const branchController = require("../controllers/branch.controller");
const router = new Router();

router.get('/branches', branchController.getBranches);
router.post('/branches', branchController.createBranch);
router.put('/branches/:id', branchController.updateBranch);
router.delete('/branches/:id', branchController.deleteBranch);

module.exports = router;
