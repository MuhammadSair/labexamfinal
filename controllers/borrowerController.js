// controllers/borrowerController.js
const Borrower = require("../models/Borrower");
const Book = require("../models/Book");

// Create a new borrower
exports.createBorrower = async (req, res) => {
  try {
    const borrower = new Borrower(req.body);
    await borrower.save();
    res.status(201).json(borrower);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all borrowers
exports.getBorrowers = async (req, res) => {
  try {
    const borrowers = await Borrower.find().populate("borrowed_books");
    res.status(200).json(borrowers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update borrower details
exports.updateBorrower = async (req, res) => {
  try {
    const borrower = await Borrower.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!borrower) {
      return res.status(404).json({ error: "Borrower not found" });
    }
    res.status(200).json(borrower);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a borrower
exports.deleteBorrower = async (req, res) => {
  try {
    const borrower = await Borrower.findByIdAndDelete(req.params.id);
    if (!borrower) {
      return res.status(404).json({ error: "Borrower not found" });
    }
    res.status(200).json({ message: "Borrower deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
