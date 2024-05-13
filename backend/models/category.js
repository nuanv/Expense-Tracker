// Import mongoose
const mongoose = require('mongoose');

// Define category schema
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
    required: true
  },
  totalExpense: {
    type: Number,
    required: false,
    default: 0
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
  
});

categorySchema.index({ name:1 ,userId: 1 }, { unique: true });
// Create a model based on the schema
const Category = mongoose.model('Category', categorySchema);

// Export the model
module.exports = Category;
