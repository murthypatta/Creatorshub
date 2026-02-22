
import { GoogleGenAI } from "@google/genai";

export async function runGeneration(systemInstruction: string, userPrompt: string): Promise<string> {
  try {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY environment variable not set");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
      },
    });

    const text = response.text;
    if (text === undefined) {
        return "No response from model."
    }
    return text;
  } catch (error) {
    console.error("Error running generation:", error);
    if (error instanceof Error) {
        return `An error occurred: ${error.message}. Please check your API key and network connection.`;
    }
    return "An unknown error occurred.";
  }
}
