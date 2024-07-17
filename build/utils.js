"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const solution_1 = require("./models/solution");
const isString = (text) => {
    return ((typeof text === "string" || text instanceof String) &&
        text.trim().length > 0);
};
const isNumber = (num) => {
    return typeof num === "number" && !isNaN(num);
};
const isArray = (arr) => {
    return Array.isArray(arr);
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
const parseImg = (img) => {
    if (!isString(img)) {
        throw new Error("Incorrect or missing image url");
    }
    return img;
};
const parseImgId = (imgId) => {
    if (!isString(imgId)) {
        throw new Error("Incorrect or missing image id");
    }
    return imgId;
};
const parseCoordinates = (coordinates) => {
    if (!isArray(coordinates) || coordinates.length !== 2) {
        throw new Error("Incorrect or missing coordinates");
    }
    const [lat, lng] = coordinates;
    if (!isNumber(lat) || !isNumber(lng)) {
        throw new Error("Coordinates must be an array of two numbers (latitude and longitude)");
    }
    return [lat, lng];
};
const parseDetails = (details) => {
    if (!isString(details)) {
        throw new Error("Incorrect or missing details");
    }
    return details;
};
const parseWebsite = (website) => {
    if (!isString(website)) {
        throw new Error("Incorrect or missing website url");
    }
    return website;
};
const parseContact = (contact) => {
    if (!isString(contact)) {
        throw new Error("Incorrect or missing contact informations");
    }
    return contact;
};
const isValidCategory = (category) => {
    return Object.values(solution_1.Category).includes(category);
};
const parseCategory = (category) => {
    if (typeof category !== "string" || !isValidCategory(category)) {
        throw new Error("Invalid or missing category");
    }
    return category;
};
const isValidRegion = (region) => {
    return Object.values(solution_1.Region).includes(region);
};
const parseRegion = (region) => {
    if (typeof region !== "string" || !isValidRegion(region)) {
        throw new Error("Invalid or missing region");
    }
    return region;
};
const toNewSolution = (object) => {
    if (!object || typeof object !== "object") {
        throw new Error("Incorrect or missing data");
    }
    if ("name" in object &&
        "description" in object &&
        "category" in object &&
        "img" in object &&
        "imgId" in object &&
        "region" in object &&
        "coordinates" in object) {
        const newSolution = {
            name: parseName(object.name),
            description: parseDescription(object.description),
            category: parseCategory(object.category),
            img: parseImg(object.img),
            imgId: parseImgId(object.imgId),
            region: parseRegion(object.region),
            coordinates: parseCoordinates(object.coordinates),
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
exports.default = { toNewSolution };
