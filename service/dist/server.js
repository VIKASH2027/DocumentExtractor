"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const extract_1 = __importDefault(require("./routes/extract"));
dotenv_1.default.config();
const port = process.env.PORT;
const app = (0, express_1.default)();
app.use("/api", extract_1.default);
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
});
