import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";
import { AppError } from "#utils/appError.js";

export interface IUser extends Document {
	username: string;
	email: string;
	country: string;
	img?: string;
	city: string;
	phone: string;
	password: string;
	isAdmin?: boolean;
}

const UserSchema = new Schema<IUser>(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		country: {
			type: String,
			// required: true,
		},
		img: {
			type: String,
		},
		city: {
			type: String,
			// required: true,
		},
		phone: {
			type: String,
			// required: true,
		},
		password: {
			type: String,
			required: true,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	},
);

UserSchema.pre("save", async function (next) {
	try {
		if (!this.isModified("password")) {
			return next();
		}

		const salt = await bcrypt.genSalt(10);
		const passwordHashed = await bcrypt.hash(this.password, salt);

		this.password = passwordHashed;

		next();
	} catch (error: unknown) {
		if (error instanceof AppError) {
			return next(error);
		}
		next();
	}
});

export const User = model<IUser>("User", UserSchema);
