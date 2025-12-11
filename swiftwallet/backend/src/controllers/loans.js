const Loan = require("../models/Loan");

exports.requestLoan = async (req, res, next) => {
  try {
    const { principal, termMonths } = req.body;
    const loan = await Loan.create({
      user: req.user.id,
      principal,
      termMonths,
      dueAmount: principal * 1.05,
    });

    res.json(loan);
  } catch (error) {
    next(error);
  }
};

exports.listLoans = async (req, res, next) => {
  try {
    const loans = await Loan.find({ user: req.user.id });
    res.json(loans);
  } catch (error) {
    next(error);
  }
};
