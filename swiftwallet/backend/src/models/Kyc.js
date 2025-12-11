const mongoose = require("mongoose");

const kycSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  verifiedAt: Date,
  documents: [String],
});

module.exports = mongoose.model("Kyc", kycSchema);
