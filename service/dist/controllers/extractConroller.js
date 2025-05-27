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
        // Pass the file path to the extractor
        const result = await (0, ai_1.extractDataFromPdfDirectly)(file.path);
        // Remove the file after processing
        fs_1.default.unlinkSync(file.path);
        res.json({ success: true, data: result });
    }
    catch (error) {
        console.log("Error Processing Pdf", error);
        res.status(500).json({
            error: "Failed to extract Data"
        });
    }
};
exports.extractDocument = extractDocument;
