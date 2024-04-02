import { ISolution } from "./models/solution";

const isString = (text: unknown): text is string => {
	return (
		(typeof text === "string" || text instanceof String) &&
		text.trim().length > 0
	);
};

const parseName = (name: unknown): string => {
	if (!isString(name)) {
		throw new Error("Incorrect or missing name");
	}

	return name;
};

const parseDescription = (description: unknown): string => {
	if (!isString(description)) {
		throw new Error("Incorrect or missing description");
	}

	return description;
};

const toNewSolution = (object: unknown): ISolution => {
	if (!object || typeof object !== "object") {
		throw new Error("Incorrect or missing data");
	}

	if ("name" in object && "description" in object) {
		const newSolution: ISolution = {
			name: parseName(object.name),
			description: parseDescription(object.description),
		};

		return newSolution;
	}

	throw new Error("Incorrect data: a field is missing");
};

export default { toNewSolution };
