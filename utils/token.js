const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
      if (err) {
        return reject(err);
      }
      resolve(user);
    });
  });
};

const newToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_KEY);
};

module.exports = { verifyToken, newToken };
