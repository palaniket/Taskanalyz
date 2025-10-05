import { GoogleGenAI } from "@google/genai";

// Initialize with your API key

const apiKey = process.env.NEXT_PUBLIC_AI_MODEL
const genAI = new GoogleGenAI({apiKey:apiKey});
// const client = new GoogleGenAI({
// apiKey: process.env.GEMINI_API_KEY, // must be set in .env
// });
  
  // const model = genAI.getGenerativeModel({
  //   model: "gemini-2.5-flash",
  // });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  

//    export const chatSession = model.startChat({
//   generationConfig,
//   history: [
//     {
//       role: "user",
//       parts: [
//         {
//           text: `You are TaskAnalyzer AI.
// You help users understand, plan, and generate steps for software projects or tasks.
// You can provide:
// - Step-by-step plans for project creation
// - Folder structure
// - Tech stack suggestions
// - API integration flow
// - Frontend and backend connection steps
// - How to store and fetch data properly
// Respond in structured JSON or text depending on user's query.`,
//         },
//       ],
//     },
//     {
//       role: "model",
//       parts: [
//         {
//           text: `{
//   "intro": "Hi! I'm TaskAnalyzer AI 👋. I can guide you step by step in planning, building, and analyzing your project.",
//   "capabilities": [
//     "Generate project structure and file hierarchy",
//     "Suggest suitable tech stack",
//     "Guide API integration and database setup",
//     "Explain frontend-backend connection",
//     "Provide optimization and deployment steps"
//   ]
// }`,
//         },
//       ],
//     },
//     {
//       role: "user",
//       parts: [
//         {
//           text: "How to generate this project?",
//         },
//       ],
//     },
//     {
//       role: "model",
//       parts: [
//         {
//           text: `{
//   "response": "Sure! Here’s how you can generate your project step by step:",
//   "steps": [
//     "1. Create a Next.js app using 'npx create-next-app@latest'.",
//     "2. Install dependencies: @google/generative-ai, dotenv, axios, tailwindcss.",
//     "3. Setup environment variable NEXT_PUBLIC_AI_MODEL with your Gemini API key.",
//     "4. Create a 'lib/geminiTaskAnalyzer.js' file for AI logic.",
//     "5. In your frontend, call the API route to send prompts to Gemini.",
//     "6. Display the response dynamically using JSON viewer or formatted text.",
//     "7. Test with prompts like 'Explain steps to integrate authentication' or 'Analyze these tasks'."
//   ],
//   "tip": "You can also store user queries and responses in a database to maintain persistent chat history."
// }`,
//         },
//       ],
//     },
//   ],
// });

   
  
  
export const chatsession = await genAI.models.startChat({
  model: "gemini-2.0-flash-exp",
  config: {
    temperature: 1,
  },
  history: [
    {
      role: "user",
      content: "You are TaskAnalyzer AI. Help users with project planning.",
    },
  ],
});