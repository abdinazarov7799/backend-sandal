const Users = require('../models/users');

exports.getUsers = async (req, res) => {
    try {
        const users = await Users.findAll();
        res.json(users);
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getOneUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await Users.findByPk(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.json(user);
        }
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const [updatedRowsCount, updatedUser] = await Users.update(req.body, { where: { id: userId }, returning: true });
        if (updatedRowsCount === 0) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.json(updatedUser[0]);
        }
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        if (userId != 1){
            const deletedRowsCount = await Users.destroy({ where: { id: userId } });
            if (deletedRowsCount === 0) {
                res.status(404).json({ error: 'User not found' });
            } else {
                res.json({ message: 'User deleted successfully' });
            }
        }else {
            res.status(400).json({ message: 'Unable to remove admin' });
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
