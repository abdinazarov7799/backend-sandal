const Product = require('../models/products');


exports.getProducts = async (req, res) => {
    try {
        const { page = 0, size = 10, category_id } = req.query;
        const offset = page * size;
        const limit = size;

        const whereClause = category_id ? { category_id } : {};

        const totalProductsCount = await Product.count({
            where: whereClause,
        });

        const products = await Product.findAll({
            where: whereClause,
            offset,
            limit,
        });

        const totalPages = Math.ceil(totalProductsCount / size);

        res.json({
            products,
            totalPages,
            page,
        });

    } catch (error) {
        console.error('Error getting products:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


exports.getOneProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findByPk(productId);
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
        } else {
            res.json(product);
        }
    } catch (error) {
        console.error('Error getting product:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.json(newProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const [updatedRowsCount, updatedProduct] = await Product.update(req.body, { where: { id: productId }, returning: true });
        if (updatedRowsCount === 0) {
            res.status(404).json({ error: 'Product not found' });
        } else {
            res.json(updatedProduct[0]);
        }
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedRowsCount = await Product.destroy({ where: { id: productId } });
        if (deletedRowsCount === 0) {
            res.status(404).json({ error: 'Product not found' });
        } else {
            res.json({ message: 'Product deleted successfully' });
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
