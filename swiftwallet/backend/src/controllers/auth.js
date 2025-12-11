const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Wallet = require("../models/Wallet");

const signToken = (user) => {
  return jwt.sign({ id: user._id, phone: user.phone }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

exports.register = async (req, res, next) => {
  try {
    const { phone, password, name } = req.body;
    const existing = await User.findOne({ phone });

    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ phone, password: hash, name });
    await Wallet.create({ user: user._id });

    const token = signToken(user);
    res.json({ user, token });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { phone, password } = req.body;
    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const token = signToken(user);
    res.json({ user, token });
  } catch (error) {
    next(error);
  }
};
