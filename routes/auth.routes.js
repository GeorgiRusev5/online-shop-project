const express = require("express");

const authController = require('../controllers/auth.controller');

const router = express.Router();

router.get("/signup", authController.getSignUp);

router.post("/signup", authController.signUp);

router.get("/login", authController.getLogIn);

router.post('/login', authController.login)

router.post('/logout', authController.logout);


module.exports = router;
