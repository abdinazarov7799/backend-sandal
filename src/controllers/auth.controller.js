const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Users = require('../models/users');
const Roles = require('../models/roles');
const Branches = require('../models/branches');

exports.signup = async (req, res) => {
    try {
        const { login, password, firstname, lastname, phone, role_id = 2, branch_id } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await Users.create({
            login,
            password: hashedPassword,
            firstname,
            lastname,
            phone,
            role_id,
            branch_id,
        });

        res.status(201).json({ success: true, message: 'User registered successfully', user });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: error.message });
    }
};



exports.login = async (req, res) => {
    try {
        const { login, password } = req.body;
        const user = await Users.findOne({ where: { login } });

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            res.status(400).json({ message: 'Invalid password' });
            return;
        }

        const token = jwt.sign({ id: user.id, login: user.login }, 'sandal', { expiresIn: '1d' });
        user.token = token;
        await user.save();
        res.json({ user, token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.getMe = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'sandal');
        const user = await Users.findByPk(decodedToken.id);
        const role = await Roles.findByPk(user.role_id);
        const branch = await Branches.findByPk(user.branch_id);

        if (!user) {
            res.status(401).json({ error: 'User not found' });
            return;
        }

        res.json({
            user,
            role,
            branch,
        });
    } catch (error) {
        console.error('Error validating token:', error);
        res.status(401).json({ error: 'Invalid token' });
    }
};
