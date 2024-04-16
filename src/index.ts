import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
// import path from "path";

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
// app.use(express.static(path.resolve(__dirname, "..", "dist")));
// app.get("*", (_req, res) => {
// 	res.sendFile(path.resolve(__dirname, "..", "dist", "index.html"));
// });

// This route doesn't need authentication
app.get("/api/public", function (_req, res) {
	res.json({
		message:
			"Hello from a public endpoint! You don't need to be authenticated to see this.",
	});
});

import { checkJwt, checkScopes } from "./middleware/auth0";

// This route needs authentication
app.get("/api/private", checkJwt, function (_req, res) {
	res.json({
		message:
			"Hello from a private endpoint! You need to be authenticated to see this.",
	});
});

app.get("/api/private-scoped", checkJwt, checkScopes, function (_req, res) {
	res.json({
		message:
			"Hello from a private endpoint! You need to be authenticated and have a scope of write:solutions to see this.",
	});
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
