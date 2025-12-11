const router = require("express").Router();
const { getBalance, getHistory } = require("../controllers/wallet");
const { protect } = require("../middleware/auth");

router.use(protect);
router.get("/balance", getBalance);
router.get("/history", getHistory);

module.exports = router;
