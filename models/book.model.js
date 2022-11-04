const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    author: { type: String, required: true },
    price: { type: Number, required: true },
    issued: { type: Number, required: true },
    title: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = new mongoose.model("book", bookSchema);
