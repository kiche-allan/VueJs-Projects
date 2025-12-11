const Savings = require("../models/Savings");

exports.createSavings = async (req, res, next) => {
  try {
    const { target, frequency } = req.body;
    const savings = await Savings.create({
      user: req.user.id,
      target,
      frequency,
    });

    res.json(savings);
  } catch (error) {
    next(error);
  }
};

exports.listSavings = async (req, res, next) => {
  try {
    const savings = await Savings.find({ user: req.user.id });
    res.json(savings);
  } catch (error) {
    next(error);
  }
};
