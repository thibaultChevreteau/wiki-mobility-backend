import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

import cors from "cors";

const app = express();
import solutionRouter from "./routes/solutions";

import mongoose from "mongoose";
import { imagekit } from "./middleware/imageKit";
import { checkJwt, checkScopes } from "./middleware/auth0";

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

// allow cross-origin requests
app.use(function (_req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

app.use((cors as (options: cors.CorsOptions) => express.RequestHandler)({}));
app.use(express.json());
app.use("/api/solutions", solutionRouter);

app.get("/api/imagekit", checkJwt, checkScopes, function (_req, res) {
	const result = imagekit.getAuthenticationParameters();
	res.send(result);
});

app.delete(
	"/api/imagekit/:file_id",
	checkJwt,
	checkScopes,
	function (req, _res) {
		const file_id = req.params.file_id;
		imagekit.deleteFile(file_id, function (error, result) {
			if (error) console.log(error);
			else console.log(result);
		});
	}
);

app.use(express.static(path.resolve(__dirname, "..", "dist")));
app.get("*", (_req, res) => {
	res.sendFile(path.resolve(__dirname, "..", "dist", "index.html"));
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
