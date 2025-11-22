import type { Response, Request, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

import { AppError } from "#utils/appError.js";

type TokenPayload = JwtPayload & {
	id?: string;
	isAdmin?: boolean;
};

export const verifyToken = (req: Request, _res: Response, next: NextFunction, cb: () => void) => {
	console.log("req cookie", req.cookies);

	const token = req.cookies?.token;

	console.log(token);

	if (!token) {
		return next(new AppError("You are not authenticated", 401));
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT!) as TokenPayload;

		console.log(decoded);

		req.user = decoded;

		// call the provided callback so higher-level verifiers can run their checks
		cb();
		return;
	} catch {
		return next(new AppError("Your are not verified", 403));
	}
};

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
	verifyToken(req, res, next, () => {
		// allow if the user id matches the requested id or the user is an admin
		const user = req.user as TokenPayload;
		if (user?.id === req.params.id || user?.isAdmin) {
			return next();
		}

		return next(new AppError("You are not allowed to do that", 403));
	});
};

export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
	verifyToken(req, res, next, () => {
		const user = req.user as TokenPayload;

		console.log("user", user);
		if (user.isAdmin) {
			next();
		} else {
			return next(new AppError("You are not authenticated", 403));
		}
	});
};
