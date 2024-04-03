"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const solution_1 = __importDefault(require("../models/solution"));
const express_1 = require("express");
//import utils from "../utils";
const router = (0, express_1.Router)();
router.get("/", ((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const solutions = yield solution_1.default.find({});
    res.json(solutions);
})));
//POST route functionning but has to implement jwt for security reasons
// router.post("/", (async (req, res) => {
// 	try {
// 		const newSolution = utils.toNewSolution(req.body);
// 		const solution = new Solution(newSolution);
// 		const savedSolution = await solution.save();
// 		res.status(201).json(savedSolution);
// 	} catch (error: unknown) {
// 		let errorMessage = "Something went wrong.";
// 		if (error instanceof Error) {
// 			errorMessage += " Error: " + error.message;
// 		}
// 		res.status(400).send(errorMessage);
// 	}
// }) as RequestHandler);
exports.default = router;
