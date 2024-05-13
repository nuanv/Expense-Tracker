const express = require("express");
const router = express.Router();
const debtController = require("../controllers/debtController");
const creditController = require("../controllers/creditController");

router.get("/debts", debtController.getDebts);
router.post("/debts", debtController.createDebt);
router.delete("/debts/:id", debtController.deleteDebt);

router.get("/credits", creditController.getCredits);
router.post("/credits", creditController.createCredit);
router.delete("/credits/:id", creditController.deleteCredit);

module.exports = router;