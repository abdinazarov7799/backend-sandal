const Role = require('../models/roles');

exports.getRoles = async (req, res) => {
    try {
        const roles = await Role.findAll();
        res.json(roles);
    } catch (error) {
        console.error('Error getting roles:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.createRole = async (req, res) => {
    try {
        const newRole = await Role.create(req.body);
        res.json(newRole);
    } catch (error) {
        console.error('Error creating role:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.updateRole = async (req, res) => {
    try {
        const roleId = req.params.id;
        const [updatedRowsCount, updatedRole] = await Role.update(req.body, { where: { id: roleId }, returning: true });
        if (updatedRowsCount === 0) {
            res.status(404).json({ message: 'Role not found' });
        } else {
            res.json(updatedRole[0]);
        }
    } catch (error) {
        console.error('Error updating role:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteRole = async (req, res) => {
    try {
        const roleId = req.params.id;
        const deletedRowsCount = await Role.destroy({ where: { id: roleId } });
        if (deletedRowsCount === 0) {
            res.status(404).json({ error: 'Role not found' });
        } else {
            res.json({ message: 'Role deleted successfully' });
        }
    } catch (error) {
        console.error('Error deleting role:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
