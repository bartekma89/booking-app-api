import { Router, type Router as RouterType } from "express";
import {
	createUser,
	deleteUser,
	getUser,
	getUsers,
	updateUser,
} from "#controllers/user.controller.js";

const router: RouterType = Router();

// GET ALL
router.get("/", getUsers);

// CREATE
router.post("/create", createUser);

// UPDATE
router.put("/:id", updateUser);

// DELETE
router.delete("/:id", deleteUser);

// GET
router.get("/:id", getUser);

export default router;
