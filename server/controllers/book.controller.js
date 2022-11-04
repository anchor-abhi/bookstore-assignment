const express = require("express");
const Book = require("../models/book.model");

const router = express.Router();

//add a new book

router.post("", async (req, res) => {
  try {
    console.log(req.body);
    const book = await Book.create(req.body);
    return res.send(book);
  } catch (error) {
    return res.send(error.message);
  }
});

//get all books with pagination
router.get("", async (req, res) => {
  try {
    const total = await Book.find().countDocuments();
    const books = await Book.find()
      .skip((+req.query.page - 1) * 10)
      .limit(10);

    return res.send({ books, total });
  } catch (error) {
    return res.send(error.message);
  }
});

//get one book
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id });

    return res.send(book);
  } catch (error) {
    return res.send(error.message);
  }
});

// update a book
router.patch("/:id", async (req, res) => {
  try {
    await Book.findByIdAndUpdate({ _id: req.params.id }, req.body);
    return res.send({ msg: "updated" });
  } catch (error) {
    return res.send(error.message);
  }
});

// delete a book
router.delete("/:id", async (req, res) => {
  try {
    await Book.findByIdAndDelete({ _id: req.params.id });
    return res.send({ msg: "deleted" });
  } catch (error) {
    return res.send(error.message);
  }
});

module.exports = router;
