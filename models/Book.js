const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Book title is required"],
      trim: true,
      minLength: [2, "Title must be at least 2 characters long"],
      maxLength: [100, "Title must be at most 100 characters long"],
      unique: true,
    },
    author: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
      minLength: [3, "Author name must be at least 3 characters long"],
      maxLength: [50, "Author name must be at most 50 characters long"],
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
      trim: true,
      enum: {
        values: [
          "Fiction",
          "Non-Fiction",
          "Science",
          "History",
          "Fantasy",
          "Biography",
          "Mystery",
        ],
        message: "{VALUE} is not a valid genre",
      },
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [1, "Price must be at least 1"],
      max: [5000, "Price cannot exceed 5000"],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
