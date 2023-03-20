const express = require("express");

const is_authenticated = require("../middleware/auth");
const check_verified = require("../middleware/verified");
const { validate_donation_input } = require("../validation/validate");
const {
  make_donation,
  get_donations,
  get_donation,
  update_donation,
  delete_donation,
  query_blood_type,
} = require("../controllers/donate.controllers");

const router = express.Router();

router.get("/users/donations", is_authenticated, get_donations);
router.get("/users/search", query_blood_type);
router.get(
  "/users/donation/:id",
  is_authenticated,
  check_verified,
  get_donation
);
router.post(
  "/users/donate",
  validate_donation_input,
  is_authenticated,
  check_verified,
  make_donation
);
router.put(
  "/users/donation/:donation_id",
  validate_donation_input,
  is_authenticated,
  check_verified,
  update_donation
);

router.delete(
  "/users/donation/:donation_id",
  is_authenticated,
  check_verified,
  delete_donation
);

module.exports = router;
