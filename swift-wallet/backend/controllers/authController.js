const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || "10");

exports.register = async (req, res) => {
  try {
    const { name, phone, pin } = req.body;
    if (!phone || !pin)
      return res.status(400).json({ error: "Phone and PIN required" });

    const existing = await User.findOne({ phone });
    if (existing) return res.status(400).json({ error: "User exists" });

    const pinHash = await bcrypt.hash(pin, SALT_ROUNDS);
    const user = new User({ name, phone, pinHash, balance: 1000 }); // seed balance for demo
    await user.save();

    const token = jwt.sign(
      { id: user._id, phone: user.phone },
      process.env.JWT_SECRET
    );
    res.json({
      token,
      user: {
        id: user._id,
        phone: user.phone,
        name: user.name,
        balance: user.balance,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { phone, pin } = req.body;
    const user = await User.findOne({ phone });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(pin, user.pinHash);
    if (!match) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, phone: user.phone },
      process.env.JWT_SECRET
    );
    res.json({
      token,
      user: {
        id: user._id,
        phone: user.phone,
        name: user.name,
        balance: user.balance,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
