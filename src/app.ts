import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();

dotenv.config({
	override: true,
});

const PORT = process.env.PORT || 4000;

app.get("/", (req, rest) => {
	rest.send("booking app1");
});

const MONGO_URI = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@mongodb:27017/social?authSource=admin`;

mongoose
	.connect(MONGO_URI)
	.then(() => {
		console.log("Connected to MongoDB");
		app.listen(PORT, () => {
			console.log(`Server is running on http://localhost:${PORT}`);
		});
	})
	.catch((err) => {
		console.log("Unable to connect to MongoDB");
		console.log(err);
	});
