const Category = require('../models/categories');

exports.getCategories = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const pageSize = parseInt(req.query.size) || 10;

        const totalCount = await Category.count();
        const totalPages = Math.ceil(totalCount / pageSize);

        const offset = page * pageSize;
        const limit = pageSize;

        const categories = await Category.findAll({ offset, limit });

        res.json({
            categories,
            totalPages,
            page,
        });
    } catch (error) {
        console.error('Error getting categories:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.createCategory = async (req, res) => {
    try {
        await Category.create(req.body);
        res.json(
            {
                success: true,
                message: "Category created successfully"
            }
        );
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const [updatedRowsCount, updatedCategory] = await Category.update(req.body, { where: { id: categoryId }, returning: true });
        if (updatedRowsCount === 0) {
            res.status(404).json({ message: 'Category not found' });
        } else {
            res.json(updatedCategory[0]);
        }
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const deletedRowsCount = await Category.destroy({ where: { id: categoryId } });
        if (deletedRowsCount === 0) {
            res.status(404).json({ error: 'Category not found' });
        } else {
            res.json({ message: 'Category deleted successfully' });
        }
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
