const express = require("express");
const {
  validate_register_input,
  validate_user_input,
} = require("../validation/validate");
const {
  user_registration,
  verify_user,
  request_verification,
  user_login,
} = require("../controllers/user.controllers");

const router = express.Router();

router.post("/users/register", validate_register_input, user_registration);
router.post("/users/verify/:id", verify_user);
router.post("/users/request-verification", request_verification);
router.post("/users/login", validate_user_input, user_login);

module.exports = router;
