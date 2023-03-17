const validateRegisterInput = (req, res, next) => {
  const {
    firstname,
    lastname,
    email,
    phone,
    password,
    bloodGroup,
    address,
    state,
  } = req.body;

  switch (true) {
    case !firstname:
      return res.status(400).json({ message: "firstname is required" });
    case !lastname:
      return res.status(400).json({ message: "lastname is required" });
    case !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email):
      return res.status(400).json({ message: "Enter a valid email address" });
    case !phone || !/^[0-9]{11}$/.test(phone):
      return res.status(400).json({ message: "Enter a valid phone number" });
    case !password || password.length < 5:
      return res
        .status(400)
        .json({ message: "Password must not be less than 5 characters" });
    case !bloodGroup || !/^(A|B|AB|O)[+-]$/.test(bloodGroup):
      return res.status(400).json({
        message:
          "Enter a valid blood group. A+, A-, B+, B-, O+, O-, AB+ or AB-.",
      });
    case !address:
      return res.status(400).json({ message: "address is required" });
    case !state:
      return res
        .status(400)
        .json({ message: "State of residence is required" });
    default:
      next();
  }
};

module.exports = validateRegisterInput;
