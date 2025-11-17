import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "#routes/auth.routes.js";
import hotelsRoutes from "#routes/hotels.routes.js";
import usersRoutes from "#routes/users.routes.js";
import { errorHandler } from "#middleware/errorHandler.js";

const app = express();

dotenv.config();

// middleware

app.use(express.json());
app.use(morgan("combined"));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/hotels", hotelsRoutes);
app.use("/api/users", usersRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 4000;
const MONGO_URI = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@mongodb:27017/booking?authSource=admin`;

// DB

const connectDb = async () => {
	try {
		await mongoose.connect(MONGO_URI);
		console.log("Connected to MongoDB");
	} catch (error) {
		console.error(error);
		throw error;
	}
};

mongoose.connection.on("disconnected", () => {
	console.log("mongoDB disconnected!");
});

connectDb()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server is running on http://localhost:${PORT}`);
		});
	})
	.catch((err) => {
		console.error("Unable to connect to MongoDB");
		console.error(err);
	});
