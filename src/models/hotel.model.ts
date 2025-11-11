import { Schema, model } from "mongoose";

export interface IHotel {
	name: string;
	type: string;
	city: string;
	addres: string;
	distance: string;
	photos?: string[];
	title: string;
	desc: string;
	rating?: number;
	rooms?: string[];
	cheapestPrice: number;
	featured?: boolean;
}

const HotelSchema = new Schema<IHotel>({
	name: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	city: {
		type: String,
		required: true,
	},
	addres: {
		type: String,
		required: true,
	},
	distance: {
		type: String,
		required: true,
	},
	photos: {
		type: [String],
	},
	title: {
		type: String,
		required: true,
	},
	desc: {
		type: String,
		required: true,
	},
	rating: {
		type: Number,
		min: 0,
		max: 5,
	},
	rooms: {
		type: [String],
	},
	cheapestPrice: {
		type: Number,
		required: true,
	},
	featured: {
		type: Boolean,
		default: false,
	},
});

export const Hotel = model<IHotel>("Hotel", HotelSchema);
