const router = require("express").Router();
const { verify, details } = require("../controllers/payments");
const { protect } = require("../middleware/auth");

router.use(protect);
router.post("/verify", verify);
router.get("/details", details);

module.exports = router;
