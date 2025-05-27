import { Request, Response } from "express";
import fs from 'fs';
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
        // Pass the file path to the extractor
        const result = await extractDataFromPdfDirectly(file.path);

        // Remove the file after processing
        fs.unlinkSync(file.path);

        res.json({ success: true, data: result });

    } catch (error) {
        console.log("Error Processing Pdf", error);
        res.status(500).json({
            error: "Failed to extract Data"
        });
    }
};