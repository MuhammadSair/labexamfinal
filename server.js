const express = require("express");
const mongoose = require("mongoose");
const Book = require("./models/Book");
const Author = require("./models/Author");
const Borrower = require("./models/Borrower");
const {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook,
} = require("./controllers/bookController");
const {
  createAuthor,
  getAuthors,
  updateAuthor,
  deleteAuthor,
} = require("./controllers/authorController");
const {
  createBorrower,
  getBorrowers,
  updateBorrower,
  deleteBorrower,
} = require("./controllers/borrowerController");

const app = express();

app.use(express.json());

// Database connection
mongoose
  .connect("mongodb://localhost:27017/library", {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Database connection error:", err));

// Book Routes
app.post("/api/books", createBook);
app.get("/api/books", getBooks);
app.get("/api/books/:id", getBookById);
app.put("/api/books/:id", updateBook);
app.delete("/api/books/:id", deleteBook);
app.post("/api/books/borrow", borrowBook);
app.post("/api/books/return", returnBook);

// Author Routes
app.post("/api/authors", createAuthor);
app.get("/api/authors", getAuthors);
app.put("/api/authors/:id", updateAuthor);
app.delete("/api/authors/:id", deleteAuthor);

// Borrower Routes
app.post("/api/borrowers", createBorrower);
app.get("/api/borrowers", getBorrowers);
app.put("/api/borrowers/:id", updateBorrower);
app.delete("/api/borrowers/:id", deleteBorrower);

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
