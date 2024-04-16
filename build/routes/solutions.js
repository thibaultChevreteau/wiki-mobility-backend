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
const utils_1 = __importDefault(require("../utils"));
const auth0_1 = require("../middleware/auth0");
const router = (0, express_1.Router)();
router.get("/", ((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const solutions = yield solution_1.default.find({});
    res.json(solutions);
})));
//POST route functionning but has to implement jwt for security reasons
router.post("/", ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newSolution = utils_1.default.toNewSolution(req.body);
        const solution = new solution_1.default(newSolution);
        const savedSolution = yield solution.save();
        res.status(201).json(savedSolution);
    }
    catch (error) {
        let errorMessage = "Something went wrong.";
        if (error instanceof Error) {
            errorMessage += " Error: " + error.message;
        }
        res.status(400).send(errorMessage);
    }
})));
router.put("/:id", auth0_1.checkJwt, auth0_1.checkScopes, ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const solutionId = req.params.id;
        const updatedSolution = utils_1.default.toNewSolution(req.body);
        const existingSolution = yield solution_1.default.findById(solutionId);
        if (!existingSolution) {
            res.status(404).send("Solution not found.");
        }
        else {
            existingSolution.set(updatedSolution);
            const savedSolution = yield existingSolution.save();
            res.status(200).json(savedSolution);
        }
    }
    catch (error) {
        let errorMessage = "Something went wrong.";
        if (error instanceof Error) {
            errorMessage += " Error: " + error.message;
        }
        res.status(400).send(errorMessage);
    }
})));
exports.default = router;
