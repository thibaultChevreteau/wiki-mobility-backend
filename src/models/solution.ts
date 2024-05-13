import { Schema, model } from "mongoose";

export enum Category {
	Amenagement = "AMÉNAGEMENT",
	Vehicule = "VÉHICULE",
	Application = "APPLICATION",
	Sensibilisation = "SENSIBILISATION",
	Ateliers = "ATELIER",
	Other = "AUTRE",
}

export enum Region {
	Occitanie = "occitanie",
	NouvelleAquitaine = "nouvelle-aquitaine",
	Other = "autre",
}

export interface ISolution {
	name: string;
	description: string;
	category: Category;
	img: string;
	imgId: string;
	region: Region;
	googlePlusCode: string;
	website?: string;
	contact?: string;
	details?: string;
}

const solutionSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	author: String,
	description: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		enum: Object.values(Category),
		required: true,
	},
	img: {
		type: String,
		required: true,
	},
	imgId: {
		type: String,
		required: true,
	},
	region: {
		type: String,
		enum: Object.values(Region),
		required: true,
	},
	googlePlusCode: {
		type: String,
		required: true,
	},
	website: {
		type: String,
		required: false,
	},
	contact: {
		type: String,
		required: false,
	},
	details: {
		type: String,
		required: false,
	},
});

solutionSchema.set("toJSON", {
	transform: (_document, returnedObject) => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

export default model<ISolution>("Solution", solutionSchema);
