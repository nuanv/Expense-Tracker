const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");
const { schema } = require("./category");

const expenseSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  expense: {
    type: Number,
    required: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
});
const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
