import fs from 'fs';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';
import pdfParse from 'pdf-parse';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const extractDataFromPdfDirectly = async (filePath: string): Promise<any> => {
    try {
        // Step 1: Extract text from PDF
        const dataBuffer = fs.readFileSync(filePath);
        const pdfData = await pdfParse(dataBuffer);

        // Step 2: Ask GPT-4o to extract structured info
        const completion = await openai.chat.completions.create({
            model: process.env.OPENAI_MODEL || 'gpt-4o',
            messages: [
                {
                    role: 'user',
                    content: `Extract these fields from the following PDF text:
- name
- InvoiceNumber
- InvoiceDate
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
    } catch (err) {
        console.error('OpenAI service error:', err);
        throw err;
    }
};