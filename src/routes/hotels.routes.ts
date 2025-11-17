import { Router, type Router as RouterType } from "express";
import {
	createHotel,
	deleteHotel,
	getHotel,
	getHotels,
	updateHotel,
} from "#controllers/hotel.controller.js";

const router: RouterType = Router();

// GET ALL
router.get("/", getHotels);

// CREATE
router.post("/create", createHotel);

// UPDATE
router.put("/:id", updateHotel);

// DELETE
router.delete("/:id", deleteHotel);

// GET
router.get("/:id", getHotel);

export default router;
