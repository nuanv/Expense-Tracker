const Expense = require("../models/expense");
const Category = require("../models/category");

const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({userId:req.user.id}).sort({ date: 1 });
    res.json({ expenses });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createExpenses = async (req, res) => {
  const { amount, category, date } = req.body;
  const userId = req.user.id;

  try {
    const existingCategory = await Category.findOne({ name: category, userId });

    if (!existingCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Calculate updated expense for the category
    const totalExpense = existingCategory.totalExpense + parseFloat(amount);

    // Create new expense with the calculated expense
    const newExpense = new Expense({
      amount,
      date,
      category,
      userId,
      expense: totalExpense,
    });
    await newExpense.save();

    // Update the category document with the new expenseForCategory
    const updatedCategory = await Category.findOneAndUpdate(
      { _id: existingCategory._id },
      { $set: { totalExpense } },
      { new: true }
    );

    res.status(201).json({
      message: "Expense created successfully",
      updatedCategory,
      budget: existingCategory.budget,
    });
  } catch (error) {
    console.error("Error creating expense:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const deleteAllExpenses = async (req, res) => {
  try {
    await Expense.deleteMany({userId:req.user.id});
    // Update the category document and set all the totalExpense field for that user to 0
    await Category.updateMany({userId:req.user.id}, { $set: { totalExpense: 0 } });
    res.status(200).json({ message: "All expenses deleted successfully" });
  } catch (error) {
    console.error("Error deleting all expenses:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getExpenses, createExpenses, deleteAllExpenses };

