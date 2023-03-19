const validate_register_input = (req, res, next) => {
  const {
    firstname,
    lastname,
    email,
    phone,
    password,
    blood_group,
    weight,
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
    case !blood_group || !/^(A|B|AB|O)[+-]$/.test(blood_group):
      return res.status(400).json({
        message:
          "Enter a valid blood group. A+, A-, B+, B-, O+, O-, AB+ or AB-.",
      });
    case !weight || !/^.*kg$/.test(weight):
      return res.status(400).json({ message: "Your weight should be in kg" });
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

module.exports = validate_register_input;
