const Category = require("../models/category.js");

const getCategory = async (req, res) => {
  try {
    const categories = await Category.find({userId:req.user.id}).sort({ budget: -1 });
    res.json({ categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createCategory = async (req, res) => {
  const { name, budget } = req.body.newCategory;
  const userId = req.user.id;

  try {
    const existingCategory = await Category.findOne({ name, userId});
    if (existingCategory) {
      return res.status(400).json({ error: "Category already exists for this user" });
    }
    const newCategory = new Category({ name: name, budget:budget, userId});
    await newCategory.save();

    res.status(201).json({ message: "Category created successfully", category: newCategory });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByIdAndDelete({_id : id ,userId:req.user.id});
    console.log(category);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, budget } = req.body;

  try {
    const category = await Category.findByIdAndUpdate(id, { name, budget }, { new: true });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json({ message: "Category updated successfully", category });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getCategory, createCategory, deleteCategory, updateCategory };
