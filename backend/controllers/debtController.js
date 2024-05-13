const Debt = require('../models/debt');

exports.createDebt = async (req, res) => {
  try {
    const { name, amount } = req.body;
    const userId = req.user.id;
    const debt = new Debt({ name, amount, userId });
    await debt.save();
    res.status(201).json(debt);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getDebts = async (req, res) => {
  try {
    const userId = req.user.id;
    const debts = await Debt.find({ userId });
    res.json(debts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteDebt = async (req, res) => {
  try {
    const _id = req.params.id;
    const userId = req.user.id;
    await Debt.findOneAndDelete({ _id, userId });
    res.status(200).json({ message: 'Debt deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};