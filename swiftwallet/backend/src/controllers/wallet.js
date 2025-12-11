const Wallet = require("../models/Wallet");
const Transaction = require("../models/Transaction");

exports.getBalance = async (req, res, next) => {
  try {
    const wallet = await Wallet.findOne({ user: req.user.id });
    if (!wallet) return res.status(404).json({ message: "Wallet not found" });

    res.json({ balance: wallet.balance });
  } catch (error) {
    next(error);
  }
};

exports.getHistory = async (req, res, next) => {
  try {
    const wallet = await Wallet.findOne({ user: req.user.id });
    if (!wallet) return res.status(404).json({ message: "Wallet not found" });

    const transactions = await Transaction.find({ wallet: wallet._id }).sort({
      createdAt: -1,
    });
    res.json({ transactions });
  } catch (error) {
    next(error);
  }
};
