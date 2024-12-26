const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true, match: /.+\@.+\..+/ },
  phone: { type: String, unique: true, required: true, match: /^[0-9]{10}$/ },
});

authorSchema.virtual("books", {
  ref: "Book",
  localField: "_id",
  foreignField: "author",
});

authorSchema.pre("save", async function (next) {
  const Book = mongoose.model("Book");
  const bookCount = await Book.countDocuments({ author: this._id });
  if (bookCount >= 5) {
    throw new Error("An author cannot have more than 5 books.");
  }
  next();
});

module.exports = mongoose.model("Author", authorSchema);
