const express = require("express")
const authorize = require('../../helper/authorize');
const router = express.Router();

const UserController = require('./controller');

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/info", authorize(["user", "admin"]), UserController.getById);


module.exports = router;