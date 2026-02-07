import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Invalid text input" },
        { status: 400 },
      );
    }

    // Limit input length
    if (text.length > 50000) {
      return NextResponse.json(
        { error: "Text too long (max 50,000 characters)" },
        { status: 400 },
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("GEMINI_API_KEY is not set");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 },
      );
    }

    const genAI = new GoogleGenAI({ apiKey });

    // Construct prompt
    const prompt = `
You are a professional document summarizer.
Please summarize the following text into exactly 5 concise bullet points.
The tone should be professional and objective.
Output format:
- Point 1
- Point 2
- Point 3
- Point 4
- Point 5

Text:
${text}
    `;

    // Call Gemini Model
    // Using 'gemini-1.5-flash' as the current standard model.
    const result = await genAI.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
      config: {
        maxOutputTokens: 1000,
        temperature: 0.2,
      },
    });

    // Extract summary
    // In @google/genai, generateContent returns the response object directly (or a Promise resolving to it).
    // It has a `candidates` property.
    const summaryText = result?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!summaryText) {
      throw new Error("No summary generated");
    }

    return NextResponse.json({ summary: summaryText });
  } catch (error: any) {
    console.error("Error generating summary:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate summary" },
      { status: 500 },
    );
  }
}
