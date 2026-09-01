import express from "express";
import dotenv from "dotenv";
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";

import landingSystemPrompt from "../src/config/landingPrompt.js";

dotenv.config();

const app = express();

app.use(express.json());

const MODEL_NAME = "gemini-3.1-flash-lite";

app.post("/api/gemini", async (req, res) => {
    try {
        const { userMessage } = req.body;

        if (!userMessage) {
            return res.status(400).json({
                error: "Message is required",
            });
        }

        const genAI = new GoogleGenerativeAI(
            process.env.GEMINI_API_KEY
        );

        const model = genAI.getGenerativeModel({
            model: MODEL_NAME,
        });

        const generationConfig = {
            temperature: 0.7,
            topK: 1,
            topP: 1,
            maxOutputTokens: 2048,
        };

        const safetySettings = [
            {
                category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
        ];

        const chat = model.startChat({
            generationConfig,
            safetySettings,
            history: [
                {
                    role: "user",
                    parts: [
                        {
                            text: landingSystemPrompt,
                        },
                    ],
                },
                {
                    role: "model",
                    parts: [
                        {
                            text: "Understood. I am the Raoute Landing Page Assistant.",
                        },
                    ],
                },
            ],
        });

        const result = await chat.sendMessage(userMessage);

        return res.status(200).json({
            response: result.response.text(),
        });

    } catch (error) {
        console.error("Gemini Error:", error);

        return res.status(500).json({
            error: "Gemini request failed",
        });
    }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});