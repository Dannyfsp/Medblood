const check_verified = (req, res, next) => {
  if (req.user.is_verified === true) {
    next();
  } else {
    return res.status(401).json({
      message: "Your account is not verified. Try verifying your account",
    });
  }
};

module.exports = check_verified;
