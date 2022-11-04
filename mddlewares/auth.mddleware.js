const { verifyToken } = require("../utils/token");
const User = require("../models/user.model");

const auth = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) return res.status(404).send("Unauthorized");
  const { user } = await verifyToken(token);

  const findUser = await User.findOne({ _id: user._id });
  if (!findUser) return res.status(404).send("Unauthorized");
  return next();
};

module.exports = auth;
