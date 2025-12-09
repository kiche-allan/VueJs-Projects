const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const txSchema = new Schema({
  reference: { type: String, required: true },
  fromPhone: { type: String },
  toPhone: { type: String },
  type: {
    type: String,
    enum: ["send", "receive", "airtime", "bill", "deposit", "withdraw"],
    required: true,
  },
  amount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "success", "failed"],
    default: "success",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Transaction", txSchema);
