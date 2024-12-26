// controllers/authorController.js
const Author = require("../models/Author");
const Book = require("../models/Book");

// Create a new author
exports.createAuthor = async (req, res) => {
  try {
    const author = new Author(req.body);
    await author.save();
    res.status(201).json(author);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all authors
exports.getAuthors = async (req, res) => {
  try {
    const authors = await Author.find().populate("books");
    res.status(200).json(authors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an author
exports.updateAuthor = async (req, res) => {
  try {
    const author = await Author.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }
    res.status(200).json(author);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an author
exports.deleteAuthor = async (req, res) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);
    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }

    // Remove the author reference from associated books
    await Book.updateMany(
      { author: req.params.id },
      { $unset: { author: "" } }
    );

    res.status(200).json({ message: "Author deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get authors with 5 books
exports.getAuthorsWithMaxBooks = async (req, res) => {
  try {
    const authors = await Author.find().populate("books");
    const filteredAuthors = authors.filter(
      (author) => author.books.length >= 5
    );

    res.status(200).json(filteredAuthors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
