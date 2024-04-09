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

const parseImg = (img: unknown): string => {
	if (!isString(img)) {
		throw new Error("Incorrect or missing image url");
	}

	return img;
};

const parseGooglePlusCode = (googlePlusCode: unknown): string => {
	if (!isString(googlePlusCode)) {
		throw new Error("Incorrect or missing image url");
	}

	return googlePlusCode;
};

const parseDetails = (details: unknown): string => {
	if (!isString(details)) {
		throw new Error("Incorrect or missing image url");
	}

	return details;
};

const toNewSolution = (object: unknown): ISolution => {
	if (!object || typeof object !== "object") {
		throw new Error("Incorrect or missing data");
	}

	if (
		"name" in object &&
		"description" in object &&
		"img" in object &&
		"googlePlusCode" in object
	) {
		const newSolution: ISolution = {
			name: parseName(object.name),
			description: parseDescription(object.description),
			img: parseImg(object.img),
			googlePlusCode: parseGooglePlusCode(object.googlePlusCode),
		};

		if ("details" in object) {
			newSolution.details = parseDetails(object.details);
		}

		return newSolution;
	}

	throw new Error("Incorrect data: a field is missing");
};

export default { toNewSolution };
