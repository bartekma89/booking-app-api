import { Router, type Router as RouterType } from "express";
import {
	createHotel,
	deleteHotel,
	getHotel,
	getHotels,
	updateHotel,
} from "#controllers/hotel.controller.js";
import { verifyAdmin } from "#middleware/verifyToken.js";

const router: RouterType = Router();

// GET ALL
router.get("/", getHotels);

// CREATE
router.post("/create", verifyAdmin, createHotel);

// UPDATE
router.put("/:id", verifyAdmin, updateHotel);

// DELETE
router.delete("/:id", verifyAdmin, deleteHotel);

// GET
router.get("/:id", getHotel);

export default router;
