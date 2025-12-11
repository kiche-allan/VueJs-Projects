const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const walletRoutes = require("./routes/wallet");
const paymentsRoutes = require("./routes/payments");
const kycRoutes = require("./routes/kyc");
const loansRoutes = require("./routes/loans");
const savingsRoutes = require("./routes/savings");

const app = express();
const PORT = process.env.PORT || 4000;

connectDB();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/payments", paymentsRoutes);
app.use("/api/kyc", kycRoutes);
app.use("/api/loans", loansRoutes);
app.use("/api/savings", savingsRoutes);

app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Server error" });
});

app.listen(PORT, () => {
  console.log(`SwiftWallet backend running on port ${PORT}`);
});
