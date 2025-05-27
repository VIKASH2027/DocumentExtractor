"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractDocument = void 0;
const fs_1 = __importDefault(require("fs"));
const ai_1 = require("../utils/ai");
const extractDocument = async (req, res) => {
    const file = req.file;
    if (!file) {
        res.status(400).json({
            message: "No File Uploaded"
        });
        return;
    }
    try {
        const result = await (0, ai_1.extractDataFromPdfDirectly)(file.path); // Use file.path
        // Optionally delete the file after processing
        fs_1.default.unlinkSync(file.path);
        res.json({ success: true, data: result });
    }
    catch (error) {
        if (file.path && fs_1.default.existsSync(file.path))
            fs_1.default.unlinkSync(file.path);
        let details = "Unknown error";
        if (error instanceof Error) {
            details = error.message;
        }
        else if (typeof error === "string") {
            details = error;
        }
        res.status(500).json({
            error: "Failed to extract Data",
            details
        });
    }
};
exports.extractDocument = extractDocument;
