const Orders = require('../models/orders');
const TelegramBot = require('node-telegram-bot-api');
const Users = require("../models/users");
const Branches = require("../models/branches");
const Products = require("../models/products");

const botToken = '6966368726:AAFfgGkx9wX0GP8Qw5YYZK7LVhGVzMrBo6M';
const adminChatId = 5498324176;
// const adminChatId = 926834986;
const bot = new TelegramBot(botToken ,{ polling: false });

exports.getOrders = async (req, res) => {
    try {
        const { page = 0, size = 10 } = req.query;
        const offset = page * size;
        const limit = size;
        const totalCount = await Orders.count();
        const totalPages = Math.ceil(totalCount / size);

        const orders = await Orders.findAll({
            order: [['createdAt', 'DESC']],
            offset,
            limit
        });

        res.json({ orders, totalCount, totalPages });
    } catch (error) {
        console.error('Error getting orders:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


exports.getOneOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Orders.findByPk(orderId);
        if (!order) {
            res.status(404).json({ message: 'Order not found' });
        } else {
            res.json(order);
        }
    } catch (error) {
        console.error('Error getting order:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getOrdersByUserId = async (req, res) => {
    try {
        const {userId = 0, page = 0 ,size = 10} = req.query;
        const offset = page * size;
        const limit = size;
        const totalCount = await Orders.count({ where: { user_id: userId } });
        const totalPages = Math.ceil(totalCount / size);

        const orders = await Orders.findAll({
            order: [['createdAt', 'DESC']],
            where: { user_id: userId },
            offset,
            limit,
        });

        res.json({
            orders,
            totalCount,
            totalPages
        });
    } catch (error) {
        console.error('Error getting orders by user ID:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.createOrder = async (req, res) => {
    try {
        const data = req.body
        const user = await Users.findOne({ where: { id: data.user_id } });
        const branch = await Branches.findOne({ where: { id: user.branch_id } });
        await Orders.create({
            ...data,
            user_firstname: user.firstname,
            user_lastname: user.lastname,
            branch_name: branch.name,
            branch_id: branch.id,
        });

        for (const item of data.items) {
            const existingItem = await Products.findByPk(item.id);
            if (existingItem) {
                existingItem.count = Math.max(0, existingItem.count - item.count);
                await existingItem.save();
            }
        }

        res.json({success: true, message: "Ariza muvofaqqiyattli jo'natildi"});
        await bot.sendMessage(adminChatId, `${user.firstname} ${user.lastname} yangi ariza qoldirdi`);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.acceptOrder = async (req, res) => {
    try {
        const orderId = req.body.id;
        const updatedRowsCount = await Orders.update({ isActive: false, status: 'accepted' }, { where: { id: orderId } });
        if (updatedRowsCount[0] === 0) {
            res.status(404).json({ error: 'Order not found' });
        } else {
            res.json({ message: 'Order accepted' });
        }
    } catch (error) {
        console.error('Error accepting order:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.rejectOrder = async (req, res) => {
    try {
        const orderId = req.body.id;
        const {reject_comment} = req.body;
        const order = await Orders.findOne({ where: { id: orderId } });
        for (const item of order.items) {
            const existingItem = await Products.findByPk(item.id);
            if (existingItem) {
                existingItem.count =  ((+existingItem.count) + (+item.count));
                await existingItem.save();
            }
        }
        const updatedRowsCount = await Orders.update({
            isActive: false,
            status: 'rejected',
            reject_comment,
        }, { where: { id: orderId } });
        if (updatedRowsCount[0] === 0) {
            res.status(404).json({ error: 'Order not found' });
        } else {
            res.json({ message: 'Order rejected' });
        }
    } catch (error) {
        console.error('Error rejecting order:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

