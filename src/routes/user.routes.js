const express = require("express");
const validate_register_input = require("../validation/validate");
const {
  user_registration,
  verify_user,
} = require("../controllers/user.controllers");
const router = express.Router();

router.post("/users/register", validate_register_input, user_registration);
router.post("/users/verify/:id", verify_user);

module.exports = router;
