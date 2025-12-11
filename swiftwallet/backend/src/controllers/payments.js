const Transaction = require("../models/Transaction");
const Wallet = require("../models/Wallet");

exports.verify = async (req, res, next) => {
  try {
    const { txnId, phone, amount } = req.body;
    const wallet = await Wallet.findOne({ user: req.user.id });

    if (!wallet) return res.status(404).json({ message: "Wallet not found" });

    const txn = await Transaction.create({
      wallet: wallet._id,
      amount,
      type: "send",
      status: "success",
      metadata: { txnId, phone },
    });

    wallet.balance -= Number(amount);
    await wallet.save();

    res.json({ txnId, amount, status: txn.status });
  } catch (error) {
    next(error);
  }
};

exports.details = async (req, res, next) => {
  try {
    const { txnId } = req.query;
    const wallet = await Wallet.findOne({ user: req.user.id });
    const txn = await Transaction.findOne({
      wallet: wallet._id,
      "metadata.txnId": txnId,
    });

    if (!txn) return res.status(404).json({ message: "Transaction not found" });

    res.json({ txnId, amount: txn.amount, status: txn.status });
  } catch (error) {
    next(error);
  }
};
