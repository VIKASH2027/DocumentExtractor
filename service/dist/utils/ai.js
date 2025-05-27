"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractDataFromPdfDirectly = void 0;
const fs_1 = __importDefault(require("fs"));
const openai_1 = require("openai");
const dotenv_1 = __importDefault(require("dotenv"));
const pdf_parse_1 = __importDefault(require("pdf-parse"));
dotenv_1.default.config();
const openai = new openai_1.OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
const extractDataFromPdfDirectly = async (filePath) => {
    try {
        // Step 1: Extract text from PDF
        const dataBuffer = fs_1.default.readFileSync(filePath);
        const pdfData = await (0, pdf_parse_1.default)(dataBuffer);
        // Step 2: Ask GPT-4o to extract structured info
        const completion = await openai.chat.completions.create({
            model: process.env.OPENAI_MODEL || 'gpt-4o',
            messages: [
                {
                    role: 'user',
                    content: `Extract these fields from the following PDF text:
- name
- invoiceNumber
- date
- totalAmount

Only respond with valid JSON.

PDF text:
${pdfData.text}`,
                }
            ]
        });
        const response = completion.choices[0]?.message?.content;
        let json = '{}';
        if (response) {
            const match = response.match(/\{[\s\S]*\}/);
            if (match) {
                json = match[0];
            }
        }
        return JSON.parse(json);
    }
    catch (err) {
        console.error('OpenAI service error:', err);
        throw err;
    }
};
exports.extractDataFromPdfDirectly = extractDataFromPdfDirectly;
