const Category = require('../models/category');

const getReport = async (req, res) => {
    try {
      const userId = req.user.id;
        // Find all categories for the current user
        const categories = await Category.find({ userId: userId});
    
        res.json(categories);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
      }
    };

module.exports = { getReport };