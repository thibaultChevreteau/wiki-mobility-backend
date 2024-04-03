"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isString = (text) => {
    return ((typeof text === "string" || text instanceof String) &&
        text.trim().length > 0);
};
const parseName = (name) => {
    if (!isString(name)) {
        throw new Error("Incorrect or missing name");
    }
    return name;
};
const parseDescription = (description) => {
    if (!isString(description)) {
        throw new Error("Incorrect or missing description");
    }
    return description;
};
const toNewSolution = (object) => {
    if (!object || typeof object !== "object") {
        throw new Error("Incorrect or missing data");
    }
    if ("name" in object && "description" in object) {
        const newSolution = {
            name: parseName(object.name),
            description: parseDescription(object.description),
        };
        return newSolution;
    }
    throw new Error("Incorrect data: a field is missing");
};
exports.default = { toNewSolution };
