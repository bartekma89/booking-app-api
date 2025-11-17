import { type Response, type Request, type NextFunction } from "express";
import { Hotel, type IHotel } from "#models/hotel.model.js";
import { AppError } from "#utils/appError.js";

export const createHotel = async (req: Request, res: Response, next: NextFunction) => {
	const hotelBody = req.body as IHotel;

	try {
		const hotel = new Hotel(hotelBody);

		await hotel.save();

		res.status(201).json({
			message: "Hotel added",
			id: hotel._id,
		});
	} catch {
		next(new AppError("Cannot create the hotel"));
	}
};

export const updateHotel = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const updatedHotel = await Hotel.findByIdAndUpdate(
			req.params.id,
			{
				$set: { ...req.body },
			},
			{
				new: true,
			},
		);

		if (!updatedHotel) {
			throw new AppError("Hotel doesn't exist", 404);
		}

		res.status(200).json({
			...updatedHotel.toObject(),
		});
	} catch (error) {
		next(error);
	}
};

export const deleteHotel = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const hotel = await Hotel.findByIdAndDelete(req.params.id);

		if (!hotel) {
			throw new AppError("Hotel doesn't exist", 404);
		}

		res.status(200).json({
			message: "Hotel deleted",
			id: hotel._id,
		});
	} catch (error) {
		next(error);
	}
};

export const getHotel = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const hotel = await Hotel.findById(req.params.id);

		if (!hotel) {
			throw new AppError("Hotel doesn't exist", 404);
		}

		res.status(200).json(hotel);
	} catch (error) {
		next(error);
	}
};

export const getHotels = async (_req: Request, res: Response, next: NextFunction) => {
	try {
		const hotels = await Hotel.find();

		res.status(200).json(hotels);
	} catch (error) {
		next(error);
	}
};
