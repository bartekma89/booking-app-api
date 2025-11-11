import type { NextFunction, Request, Response } from "express";

import type { AppError } from "#utils/appError.js";

export const errorHandler = (
	error: AppError,
	_req: Request,
	res: Response,
	_next: NextFunction,
) => {
	console.error("Error: ", error.message);
	const errorStatus = error.status ?? 500;
	const erorrMessage = error.message ?? "Internal Error";

	res.status(errorStatus).json({
		success: false,
		status: "error",
		message: erorrMessage,
		stack: error.stack,
	});
};
