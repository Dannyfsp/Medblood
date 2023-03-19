const express = require("express");

const is_authenticated = require("../middleware/auth");
const check_verified = require("../middleware/verified");
const { validate_donation_input } = require("../validation/validate");
const {
  make_donation,
  get_donations,
  get_donation,
} = require("../controllers/donate.controllers");

const router = express.Router();

router.get("/users/donation", is_authenticated, get_donations);
router.get(
  "/users/donation/:id",
  is_authenticated,
  check_verified,
  get_donation
);
router.post(
  "/users/donation/:id",
  validate_donation_input,
  is_authenticated,
  check_verified,
  make_donation
);

module.exports = router;
