const express = require("express");
const expRouter = express.Router();
const cors = require("cors");
const { getExpenses, createExpenses, deleteAllExpenses } = require("../controllers/expController"); // Import deleteAllExpenses

expRouter.get("/get/expenses", getExpenses);
expRouter.post("/post/expenses", createExpenses);
expRouter.delete("/delete/all", deleteAllExpenses); // Add route for deleting all expenses

module.exports = expRouter;