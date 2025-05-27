import { Request, Response } from "express";
import fs from 'fs';
import path from 'path';
import { extractDataFromPdfDirectly } from "../utils/ai";

export const extractDocument = async (req: Request, res: Response) => {
    const file = req.file;

    if (!file) {
        res.status(400).json({
            message: "No File Uploaded"
        });
        return;
    }

    try {
        const result = await extractDataFromPdfDirectly(file.path); // Use file.path
        // Optionally delete the file after processing
        fs.unlinkSync(file.path);
        res.json({ success: true, data: result });
    } catch (error) {
        if (file.path && fs.existsSync(file.path)) fs.unlinkSync(file.path);
        let details = "Unknown error";
        if (error instanceof Error) {
            details = error.message;
        } else if (typeof error === "string") {
            details = error;
        }
        res.status(500).json({
            error: "Failed to extract Data",
            details
        });
    }
};
