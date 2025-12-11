const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  principal: { type: Number, required: true },
  termMonths: { type: Number, default: 6 },
  dueAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["active", "paid", "defaulted"],
    default: "active",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Loan", loanSchema);
