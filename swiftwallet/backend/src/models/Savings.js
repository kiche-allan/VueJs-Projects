const mongoose = require("mongoose");

const savingsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  target: { type: Number, required: true },
  current: { type: Number, default: 0 },
  frequency: {
    type: String,
    enum: ["weekly", "biweekly", "monthly"],
    default: "monthly",
  },
});

module.exports = mongoose.model("Savings", savingsSchema);
