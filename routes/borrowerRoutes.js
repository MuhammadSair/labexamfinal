const express = require("express");
const router = express.Router();
const borrowerController = require("../controllers/borrowerController");

// Borrower CRUD operations
router.post("/", borrowerController.createBorrower);
router.get("/", borrowerController.getBorrowers);
router.get("/:id", borrowerController.getBorrowerById);
router.put("/:id", borrowerController.updateBorrower);
router.delete("/:id", borrowerController.deleteBorrower);

// Borrowing and returning books
router.post("/:id/borrow", borrowerController.borrowBook);
router.post("/:id/return", borrowerController.returnBook);

module.exports = router;
