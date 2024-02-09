const Branch = require('../models/branches');

exports.getBranches = async (req, res) => {
    try {
        const branches = await Branch.findAll();
        res.json(branches);
    } catch (error) {
        console.error('Error getting branches:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getOneBranch = async (req, res) => {
    try {
        const branchId = req.params.id;
        const branch = await Branch.findByPk(branchId);
        if (!branch) {
            res.status(404).json({ message: 'Branch not found' });
        } else {
            res.json(branch);
        }
    } catch (error) {
        console.error('Error getting branch:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.createBranch = async (req, res) => {
    try {
        const newBranch = await Branch.create(req.body);
        res.json(newBranch);
    } catch (error) {
        console.error('Error creating branch:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateBranch = async (req, res) => {
    try {
        const branchId = req.params.id;
        const [updatedRowsCount, updatedBranch] = await Branch.update(req.body, { where: { id: branchId }, returning: true });
        if (updatedRowsCount === 0) {
            res.status(404).json({ error: 'Branch not found' });
        } else {
            res.json(updatedBranch[0]);
        }
    } catch (error) {
        console.error('Error updating branch:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteBranch = async (req, res) => {
    try {
        const branchId = req.params.id;

        if (branchId != 1){
            const deletedRowsCount = await Branch.destroy({ where: { id: branchId } });
            if (deletedRowsCount === 0) {
                res.status(404).json({ message: 'Branch not found' });
            } else {
                res.json({ message: 'Branch deleted successfully' });
            }
        }else {
            res.status(400).json({ message: 'Unable to remove this branch' });
        }

    } catch (error) {
        console.error('Error deleting branch:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
