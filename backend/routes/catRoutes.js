const express = require("express");
const catRouter = express.Router();
const { getCategory, createCategory, deleteCategory, updateCategory } = require("../controllers/catController");

catRouter.get("/get/categories", getCategory);
catRouter.post("/post/categories", createCategory);
catRouter.delete("/delete/categories/:id", deleteCategory);
catRouter.put("/update/categories/:id", updateCategory);

module.exports = catRouter;
