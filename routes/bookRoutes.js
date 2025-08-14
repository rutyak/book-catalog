const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

const bookRouter = express.Router();

bookRouter.post("/books", protect, createBook);

bookRouter.get("/books", getAllBooks);

bookRouter.get("/book/:id", getBookById);

bookRouter.put("/book/:id", protect, updateBook);

bookRouter.delete("/book/:id", protect, deleteBook);

module.exports = bookRouter;
