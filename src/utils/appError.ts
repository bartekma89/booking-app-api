export class AppError extends Error {
	message: string;
	status: number;

	constructor(message: string, status = 500) {
		super(message);

		this.message = message;
		this.status = status;
	}
}
