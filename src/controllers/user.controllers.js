const prisma = require("../config/prisma");
const validateRegisterInput = require("../validation/validate");

exports.userRegistration = async (req, res) => {
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
};
