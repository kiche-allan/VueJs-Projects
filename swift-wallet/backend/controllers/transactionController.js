const Transaction = require("../models/Transaction");
const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");

exports.getTransactions = async (req, res) => {
  const { phone } = req.query;
  const txs = await Transaction.find({
    $or: [{ fromPhone: phone }, { toPhone: phone }],
  })
    .sort({ createdAt: -1 })
    .limit(50);
  res.json(txs);
};

exports.sendMoney = async (req, res) => {
  try {
    const { fromPhone, toPhone, amount } = req.body;
    if (!fromPhone || !toPhone || !amount)
      return res.status(400).json({ error: "Missing fields" });
    if (fromPhone === toPhone)
      return res.status(400).json({ error: "Cannot send to self" });

    const sender = await User.findOne({ phone: fromPhone });
    const receiver = await User.findOne({ phone: toPhone });

    if (!sender) return res.status(404).json({ error: "Sender not found" });
    if (!receiver) return res.status(404).json({ error: "Receiver not found" });

    if (sender.balance < amount)
      return res.status(400).json({ error: "Insufficient funds" });

    sender.balance -= amount;
    receiver.balance += amount;

    await sender.save();
    await receiver.save();

    const reference = "SW-" + uuidv4().slice(0, 8).toUpperCase();

    const txOut = new Transaction({
      reference,
      fromPhone,
      toPhone,
      type: "send",
      amount,
      status: "success",
    });
    await txOut.save();

    res.json({ success: true, reference, senderBalance: sender.balance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
