const express = require("express");
const validateRegisterInput = require("../validation/validate");
const { userRegistration } = require("../controllers/user.controllers");
const route = express.Router();

route.post("/users/register", validateRegisterInput, userRegistration);

module.exports = route;
