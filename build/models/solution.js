"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const solutionSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    author: String,
    description: {
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
exports.default = (0, mongoose_1.model)("Solution", solutionSchema);
