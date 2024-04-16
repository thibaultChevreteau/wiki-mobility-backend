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
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const dotenv_1 = __importDefault(require("dotenv"));
// import path from "path";
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const solutions_1 = __importDefault(require("./routes/solutions"));
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.set("strictQuery", false);
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!MONGODB_URI) {
                throw new Error("MONGODB_URI is not defined in the environment variables.");
            }
            yield mongoose_1.default.connect(MONGODB_URI);
            console.log("Connected to MongoDB Atlas");
        }
        catch (error) {
            console.error("Error connecting to MongoDB Atlas:", error);
        }
    });
}
void connectToDatabase();
app.use(cors_1.default({}));
app.use(express_1.default.json());
app.use("/api/solutions", solutions_1.default);
// app.use(express.static(path.resolve(__dirname, "..", "dist")));
// app.get("*", (_req, res) => {
// 	res.sendFile(path.resolve(__dirname, "..", "dist", "index.html"));
// });
// This route doesn't need authentication
app.get("/api/public", function (_req, res) {
    res.json({
        message: "Hello from a public endpoint! You don't need to be authenticated to see this.",
    });
});
const auth0_1 = require("./middleware/auth0");
// This route needs authentication
app.get("/api/private", auth0_1.checkJwt, function (_req, res) {
    res.json({
        message: "Hello from a private endpoint! You need to be authenticated to see this.",
    });
});
app.get("/api/private-scoped", auth0_1.checkJwt, auth0_1.checkScopes, function (_req, res) {
    res.json({
        message: "Hello from a private endpoint! You need to be authenticated and have a scope of write:solutions to see this.",
    });
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
