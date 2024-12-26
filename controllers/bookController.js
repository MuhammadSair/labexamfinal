const Book = require("../models/Book");
const Borrower = require("../models/Borrower");

exports.createBook = async (req, res) => {
  try {
    const { author } = req.body;

    // Check if the author exists and count their books
    const authorBooksCount = await Book.countDocuments({ author });
    if (authorBooksCount >= 5) {
      return res
        .status(400)
        .json({ error: "An author cannot have more than 5 books." });
    }

    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { author } = req.body;

    // If author is being updated, validate the new author
    if (author) {
      const authorBooksCount = await Book.countDocuments({ author });
      if (authorBooksCount >= 5) {
        return res
          .status(400)
          .json({ error: "An author cannot have more than 5 books." });
      }
    }

    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate("author");
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }
    res.status(200).send(book);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.borrowBook = async (req, res) => {
  const { bookId, borrowerId } = req.body;
  try {
    const book = await Book.findById(bookId);
    const borrower = await Borrower.findById(borrowerId);

    if (!book || !borrower) {
      return res.status(404).json({ error: "Book or Borrower not found" });
    }
    if (book.available_copies <= 0) {
      return res
        .status(400)
        .json({ error: "No available copies of this book" });
    }
    if (!borrower.canBorrow()) {
      return res
        .status(400)
        .json({ error: "Borrower has reached borrowing limit" });
    }

    book.available_copies -= 1;
    book.times_borrowed += 1;
    borrower.borrowed_books.push(book._id);

    await book.save();
    await borrower.save();

    res.status(200).json({ message: "Book borrowed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.returnBook = async (req, res) => {
  const { bookId, borrowerId } = req.body;
  try {
    const book = await Book.findById(bookId);
    const borrower = await Borrower.findById(borrowerId);

    if (!book || !borrower) {
      return res.status(404).json({ error: "Book or Borrower not found" });
    }

    book.available_copies += 1;
    borrower.borrowed_books = borrower.borrowed_books.filter(
      (borrowedBookId) => borrowedBookId.toString() !== book._id.toString()
    );

    await book.save();
    await borrower.save();

    res.status(200).json({ message: "Book returned successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
