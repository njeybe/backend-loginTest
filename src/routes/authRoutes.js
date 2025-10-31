const express = require("express");
const router = express.Router();

// calls the register and login user from authController
const { registerUser, loginUser } = require("../controllers/authController");

router.post("/login", loginUser);
router.post("/signup", registerUser);

export default router;
