const express = require ("express");
const router = express.Router()

//Controller
const {register, login, getCurrentUser} = require("../controllers/UserController")


// Middlewares
const validate = require("../middlewares/hadleValidation");
const { userCreateValidation, loginValidation } = require("../middlewares/userValidation");
const authGuard = require("../middlewares/authGuard");

// Routes
router.post("/register", userCreateValidation(), validate, register);
router.post("/login", loginValidation(), validate, login);
router.get("/profile", authGuard , validate, getCurrentUser)

module.exports = router;
