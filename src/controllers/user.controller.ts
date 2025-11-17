import { type Response, type Request, type NextFunction } from "express";
import { User, type IUser } from "#models/user.model.js";
import { AppError } from "#utils/appError.js";

export const createUser = async (
	req: Request<unknown, unknown, IUser>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const user = new User(req.body);

		await user.save();

		res.status(201).json({
			message: "User added",
			id: user._id,
		});
	} catch {
		next(new AppError("Cannot create the user"));
	}
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const updatedUser = await User.findByIdAndUpdate(
			req.params.id,
			{
				$set: { ...req.body },
			},
			{
				new: true,
			},
		);

		if (!updatedUser) {
			throw new AppError("User doesn't exist", 404);
		}

		res.status(200).json({
			...updatedUser.toObject(),
		});
	} catch (error) {
		next(error);
	}
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id);

		if (!user) {
			throw new AppError("User doesn't exist", 404);
		}

		res.status(200).json({
			message: "User deleted",
			id: user._id,
		});
	} catch (error) {
		next(error);
	}
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await User.findById(req.params.id);

		if (!user) {
			throw new AppError("User doesn't exist", 404);
		}

		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
};

export const getUsers = async (_req: Request, res: Response, next: NextFunction) => {
	try {
		const users = await User.find();

		res.status(200).json(users);
	} catch (error) {
		next(error);
	}
};
