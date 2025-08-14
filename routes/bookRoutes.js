const express = require("express");
const protect = require("../middleware/authMiddleware");
const { createBook, getAllBooks, getBookById, updateBook, deleteBook } = require("../controllers/bookController");

const bookRouter = express.Router();

bookRouter.post("/api/books", protect, createBook);

bookRouter.get("/api/books", getAllBooks);

bookRouter.get("/api/book/:id", getBookById);

bookRouter.put("/api/book/:id", protect, updateBook);

bookRouter.delete("/api/book/:id", protect, deleteBook);

module.exports = bookRouter;
