const express = require ("express");
const router = express.Router()

//Controller
const {register, login, getCurrentUser, updateUser, getUserById} = require("../controllers/UserController")


// Middlewares
const validate = require("../middlewares/hadleValidation");
const { userCreateValidation, loginValidation, userUpdateValidation } = require("../middlewares/userValidation");
const authGuard = require("../middlewares/authGuard");
const { imageUpload } = require("../middlewares/imageUpload");

// Routes
router.post("/register", userCreateValidation(), validate, register);
router.post("/login", loginValidation(), validate, login);
router.get("/profile", authGuard , validate, getCurrentUser)
router.put("/",authGuard, userUpdateValidation() , validate, imageUpload.single("profileImage"), updateUser)
router.get("/:id", authGuard,  getUserById)

module.exports = router;
