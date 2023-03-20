const jwt = require("jsonwebtoken");

const is_authenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    const decrypt_token = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decrypt_token) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    req.user = decrypt_token;
    next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = is_authenticated;
