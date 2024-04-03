import express from "express";
import "express-async-errors";
import dotenv from "dotenv";

dotenv.config();

import cors from "cors";

const app = express();
import solutionRouter from "./routes/solutions";

import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

async function connectToDatabase() {
	try {
		if (!MONGODB_URI) {
			throw new Error(
				"MONGODB_URI is not defined in the environment variables."
			);
		}

		await mongoose.connect(MONGODB_URI);
		console.log("Connected to MongoDB Atlas");
	} catch (error) {
		console.error("Error connecting to MongoDB Atlas:", error);
	}
}

void connectToDatabase();

app.use((cors as (options: cors.CorsOptions) => express.RequestHandler)({}));
app.use(express.json());
app.use("/api/solutions", solutionRouter);
app.use(express.static("dist"));

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
