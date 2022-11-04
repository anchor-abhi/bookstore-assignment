const express = require("express");
const { body, validationResult, check } = require("express-validator");
const User = require("../models/user.model");
const { newToken } = require("../utils/token");

const router = express.Router();

//create a new user
router.post(
  "/signup",
  body("firstName").notEmpty().isString(),
  body("email").notEmpty().isEmail(),
  check("password")
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage("must be at least 5 chars long")
    .matches(/\d/)
    .withMessage("must contain a number"),
  async (req, res) => {
    try {
      const findUser = await User.findOne({
        email: req.body.email,
      });

      if (findUser) {
        return res.status(400).send({
          emailExists: "Email already exists, please try logging in",
        });
      }
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }

      const user = await User.create(req.body);
      const token = newToken(user);
      return res.status(200).send({ token });
    } catch (e) {
      res.send(e.message);
    }
  }
);

//login a user
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Enter valid email and password");
    }
    const match = user.checkPassword(password);
    if (!match) {
      return res.status(400).send("Enter valid email and password");
    }

    const token = newToken(user);
    return res.status(200).send({ token });
  } catch (e) {
    res.send(e.message);
  }
});

module.exports = router;
