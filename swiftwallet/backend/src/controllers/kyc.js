const Kyc = require("../models/Kyc");

exports.submit = async (req, res, next) => {
  try {
    const { documents } = req.body;
    const existing = await Kyc.findOne({ user: req.user.id });

    if (existing) {
      existing.status = "pending";
      existing.documents = documents;
      await existing.save();
      return res.json(existing);
    }

    const kyc = await Kyc.create({ user: req.user.id, documents });
    res.json(kyc);
  } catch (error) {
    next(error);
  }
};

exports.status = async (req, res, next) => {
  try {
    const kyc = await Kyc.findOne({ user: req.user.id });
    res.json(kyc || { status: "pending" });
  } catch (error) {
    next(error);
  }
};
