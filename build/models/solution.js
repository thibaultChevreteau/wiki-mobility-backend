"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Region = exports.Category = void 0;
const mongoose_1 = require("mongoose");
var Category;
(function (Category) {
    Category["Amenagement"] = "Am\u00E9nagement";
    Category["Materiel"] = "Mat\u00E9riel";
    Category["Sensibilisation"] = "Sensibilisation";
    Category["Other"] = "autre";
})(Category || (exports.Category = Category = {}));
var Region;
(function (Region) {
    Region["Occitanie"] = "occitanie";
    Region["NouvelleAquitaine"] = "nouvelle-aquitaine";
    Region["Other"] = "autre";
})(Region || (exports.Region = Region = {}));
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
    category: {
        type: String,
        enum: Object.values(Category),
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    region: {
        type: String,
        enum: Object.values(Region),
        required: true,
    },
    googlePlusCode: {
        type: String,
        required: true,
    },
    website: {
        type: String,
        required: false,
    },
    contact: {
        type: String,
        required: false,
    },
    details: {
        type: String,
        required: false,
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
