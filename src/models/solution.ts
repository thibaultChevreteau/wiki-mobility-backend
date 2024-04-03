import { Schema, model } from "mongoose";

export interface ISolution {
	name: string;
	description: string;
	img: string;
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
	img: {
		type: String,
		required: true,
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
