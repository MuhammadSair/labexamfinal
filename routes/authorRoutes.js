const express = require("express");
const router = express.Router();
const authorController = require("../controllers/authorController");

// Author CRUD operations
router.post("/", authorController.createAuthor);
router.get("/", authorController.getAuthors);
router.get("/limit-reached", authorController.getAuthorsWithLimitReached);
router.put("/:id", authorController.updateAuthor);
router.delete("/:id", authorController.deleteAuthor);

module.exports = router;
