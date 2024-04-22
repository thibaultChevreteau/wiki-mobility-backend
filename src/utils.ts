import { Category, ISolution, Region } from "./models/solution";

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

const parseImgId = (imgId: unknown): string => {
	if (!isString(imgId)) {
		throw new Error("Incorrect or missing image id");
	}

	return imgId;
};

const parseGooglePlusCode = (googlePlusCode: unknown): string => {
	if (!isString(googlePlusCode)) {
		throw new Error("Incorrect or missing image url");
	}

	return googlePlusCode;
};

const parseDetails = (details: unknown): string => {
	if (!isString(details)) {
		throw new Error("Incorrect or missing details");
	}

	return details;
};

const parseWebsite = (website: unknown): string => {
	if (!isString(website)) {
		throw new Error("Incorrect or missing website url");
	}

	return website;
};
const parseContact = (contact: unknown): string => {
	if (!isString(contact)) {
		throw new Error("Incorrect or missing contact informations");
	}

	return contact;
};

const isValidCategory = (category: string): boolean => {
	return Object.values(Category).includes(category as Category);
};

const parseCategory = (category: unknown): Category => {
	if (typeof category !== "string" || !isValidCategory(category)) {
		throw new Error("Invalid or missing category");
	}

	return category as Category;
};

const isValidRegion = (region: string): boolean => {
	return Object.values(Region).includes(region as Region);
};

const parseRegion = (region: unknown): Region => {
	if (typeof region !== "string" || !isValidRegion(region)) {
		throw new Error("Invalid or missing region");
	}

	return region as Region;
};

const toNewSolution = (object: unknown): ISolution => {
	if (!object || typeof object !== "object") {
		throw new Error("Incorrect or missing data");
	}

	if (
		"name" in object &&
		"description" in object &&
		"category" in object &&
		"img" in object &&
		"imgId" in object &&
		"region" in object &&
		"googlePlusCode" in object
	) {
		const newSolution: ISolution = {
			name: parseName(object.name),
			description: parseDescription(object.description),
			category: parseCategory(object.category),
			img: parseImg(object.img),
			imgId: parseImgId(object.imgId),
			region: parseRegion(object.region),
			googlePlusCode: parseGooglePlusCode(object.googlePlusCode),
		};

		if ("details" in object) {
			newSolution.details = parseDetails(object.details);
		}
		if ("website" in object) {
			newSolution.website = parseWebsite(object.website);
		}
		if ("contact" in object) {
			newSolution.contact = parseContact(object.contact);
		}

		return newSolution;
	}

	throw new Error("Incorrect data: a field is missing");
};

export default { toNewSolution };
