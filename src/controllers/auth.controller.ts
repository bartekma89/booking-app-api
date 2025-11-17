import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import type { Request, Response, NextFunction } from "express";

import { User, type IUser } from "#models/user.model.js";
import { AppError } from "#utils/appError.js";

export const register = async (req: Request, res: Response, next: NextFunction) => {
	const { username, password, email } = req.body as IUser;

	try {
		const user = new User({
			username,
			password,
			email,
		});

		await user.save();

		res.status(201).json({
			message: "User register",
			userId: user._id,
		});
	} catch (error) {
		next(error);
	}
};

export const login = async (
	req: Request<unknown, unknown, { username: string; password: string }>,
	res: Response,
	next: NextFunction,
) => {
	const { password, username } = req.body;

	try {
		const user = await User.findOne({ username });

		if (!user) {
			throw new AppError("User not found!", 404);
		}

		const isPasswordCorrect = await bcrypt.compare(password, user.password);

		if (!isPasswordCorrect) {
			throw new AppError("Wrong password or username!", 400);
		}

		const { email, username: name, _id: id, isAdmin } = user.toObject();

		const token = jwt.sign({ id, isAdmin }, process.env.JWT!);
		console.log(token);

		res
			.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
			.status(200)
			.json({ email, username: name, id });
	} catch (error) {
		next(error);
	}
};
