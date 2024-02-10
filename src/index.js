const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const userRouter = require('./routes/user.routes');
const branchRouter = require('./routes/branch.routes');
const categoryRouter = require('./routes/category.routes');
const orderRouter = require('./routes/order.routes');
const productRouter = require('./routes/product.routes');
const roleRouter = require('./routes/role.routes');
const authRouter = require('./routes/auth.routes');
const { updateOrCreateModels } = require('./config/init');
const jwt = require("jsonwebtoken");
const Users = require("./models/users");

const app = express();
const port = process.env.PORT || 7799;

app.use(cors());

sequelize.sync({ force: false })
    .then(() => {
        updateOrCreateModels();
        console.log('Database created successfully');
    })
    .catch((error) => {
        console.error('Database create error:', error);
    });

app.use(express.json());

app.use('/api', authRouter);
app.use('/api', async (req, res, next) => {

    try {
        const token = req.headers?.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: "Unauthorized: Token not provided" });
        }

        const decodedToken = jwt.verify(token, 'sandal');
        const user = await Users.findByPk(decodedToken.id);

        if (!user) {
            return res.status(401).json({ error: 'Unauthorized: User not found' });
        }
        next();
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
});

app.use('/api', userRouter);
app.use('/api', branchRouter);
app.use('/api', categoryRouter);
app.use('/api', orderRouter);
app.use('/api', productRouter);
app.use('/api', roleRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
