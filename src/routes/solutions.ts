import Solution from "../models/solution";
import { RequestHandler, Router } from "express";
import utils from "../utils";
import { checkJwt, checkScopes } from "../middleware/auth0";

const router = Router();

router.get("/", (async (_req, res) => {
	const solutions = await Solution.find({});
	res.json(solutions);
}) as RequestHandler);

//POST route functionning but has to implement jwt for security reasons
router.post("/", (async (req, res) => {
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

export default router;
