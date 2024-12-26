const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
  isbn: { type: String, unique: true, required: true },
  available_copies: { type: Number, required: true, min: 0 },
  times_borrowed: { type: Number, default: 0 },
});

bookSchema.pre("save", function (next) {
  if (this.times_borrowed > 10 && this.available_copies > 100) {
    throw new Error(
      "Available copies cannot exceed 100 for books borrowed more than 10 times."
    );
  }
  next();
});

module.exports = mongoose.model("Book", bookSchema);
