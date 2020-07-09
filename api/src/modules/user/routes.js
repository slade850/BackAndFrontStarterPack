import express from "express";
import authorize from '../../helper/authorize';
const router = express.Router();

import UserController from './controller';

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/info", authorize(["user", "admin"]), UserController.getById);


export default router;