const express = require("express");
const router = express.Router();
const tx = require("../controllers/transactionController");

router.get("/", tx.getTransactions);
router.post("/send", tx.sendMoney);

module.exports = router;
