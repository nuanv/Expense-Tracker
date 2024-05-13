const express = require("express");
const repRouter = express.Router();
const { getReport } = require("../controllers/repController");

repRouter.get("/get/report", getReport);

module.exports = repRouter;