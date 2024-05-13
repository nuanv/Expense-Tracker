const Credit = require('../models/credit');

exports.createCredit = async (req, res) => {
  try {
    const { name, amount } = req.body;
    const userId = req.user.id;
    const credit = new Credit({ name, amount, userId });
    await credit.save();
    res.status(201).json(credit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getCredits = async (req, res) => {
  try {
    const userId = req.user.id;
    const credits = await Credit.find({ userId });
    res.json(credits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCredit = async (req, res) => {
  try {
    const _id = req.params.id;
    const userId = req.user.id;
    await Credit.findOneAndDelete({ _id, userId });
    res.status(200).json({ message: 'Credit deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};