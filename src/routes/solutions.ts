import Solution from "../models/solution";
import { RequestHandler, Router } from "express";
import utils from "../utils";
import { checkJwt, checkScopes } from "../middleware/auth0";
import { imagekit } from "../middleware/imageKit";

const router = Router();

router.get("/", (async (_req, res) => {
	try {
		const solutions = await Solution.find({});
		res.json(solutions);
	} catch (error) {
		console.log(error);
		throw new Error("erreur");
	}
}) as RequestHandler);

router.post("/", checkJwt, checkScopes, (async (req, res) => {
	try {
		const newSolution = utils.toNewSolution(req.body);
		const solution = new Solution(newSolution);
		const savedSolution = await solution.save();
		res.status(201).json(savedSolution);
	} catch (error: unknown) {
		let errorMessage = "Something went wrong.";
		if (error instanceof Error) {
			errorMessage += " Error: " + error.message;
		}
		res.status(400).send(errorMessage);
	}
}) as RequestHandler);

router.put("/:id", checkJwt, checkScopes, (async (req, res) => {
	try {
		const solutionId = req.params.id;
		const updatedSolution = utils.toNewSolution(req.body);
		const existingSolution = await Solution.findById(solutionId);
		if (!existingSolution) {
			res.status(404).send("Solution not found.");
		} else {
			existingSolution.set(updatedSolution);
			const savedSolution = await existingSolution.save();
			res.status(200).json(savedSolution);
		}
	} catch (error) {
		let errorMessage = "Something went wrong.";
		if (error instanceof Error) {
			errorMessage += " Error: " + error.message;
		}
		res.status(400).send(errorMessage);
	}
}) as RequestHandler);

router.get("/imagekit/:file_id", function (req, res) {
	const file_id = req.params.file_id;
	imagekit.getFileDetails(file_id, function (error, result) {
		if (error) console.log(error);
		else {
			res.json(result?.url);
			console.log(result);
		}
	});
});

export default router;
