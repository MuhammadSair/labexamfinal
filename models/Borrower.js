const mongoose = require("mongoose");

const borrowerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  borrowed_books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
  membershipActive: { type: Boolean, required: true },
  membershipType: {
    type: String,
    enum: ["Standard", "Platinum"],
    required: true,
  },
});

borrowerSchema.methods.canBorrow = function () {
  const maxBooks = this.membershipType === "Platinum" ? 10 : 5;
  return this.borrowed_books.length < maxBooks;
};

module.exports = mongoose.model("Borrower", borrowerSchema);
