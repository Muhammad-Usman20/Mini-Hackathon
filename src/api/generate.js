// export async function generatePitch({ idea, tone }) {
//   // Mock generator for local demo
//   return new Promise(resolve =>
//     setTimeout(() => {
//       resolve({
//         name: 'IdeaBoost',
//         tagline: 'Turn ideas into impact',
//         pitch: `An AI tool that transforms "${idea}" into a ${tone} startup pitch.`,
//         problem: 'People struggle to present ideas effectively.',
//         solution: 'Generates concise, catchy startup summaries automatically.'
//       })
//     }, 1000)
//   )
// }


// export async function generatePitch({ idea, tone }) {
//     // Replace with your actual API call
//     return new Promise(resolve => {
//         setTimeout(() => {
//             resolve({
//                 name: 'Demo Startup',
//                 tagline: 'Making your idea reality',
//                 pitch: 'This is a demo pitch for your startup idea.',
//                 problem: 'Problem description',
//                 solution: 'Solution description',
//                 audience: 'Target audience',
//                 heroTitle: 'Welcome to PitchCraft',
//                 heroSubtitle: 'Your pitch generation assistant'
//             })
//         }, 1000)
//     })
// }




// // // src/api/generate.js
// import { GoogleGenerativeAI } from "@google/generative-ai";

// // Initialize Gemini using the API key from .env
// const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// export async function generatePitch({ idea, tone }) {
//     try {
//         // Use a working model name (flash = faster, pro = smarter)
//         const model = genAI.getGenerativeModel({ model: "gemini-pro" });


//         const prompt = `
// You are a startup pitch generator called PitchCraft.
// Generate a pitch in this format:

// Name: [startup name]
// Tagline: [short tagline]
// Pitch: [short paragraph about the idea]
// Problem: [problem it solves]
// Solution: [how it solves it]
// Audience: [target audience]
// HeroTitle: [landing page headline]
// HeroSubtitle: [short supporting subtitle]

// Idea: ${idea}
// Tone: ${tone}
// `;

//         const result = await model.generateContent(prompt);
//         const text = result.response.text();
//         console.log("Gemini output:", text);

//         // Parse Gemini output to object (optional)
//         const parsed = parseGeminiResponse(text);
//         return parsed || { raw: text };
//     } catch (error) {
//         console.error("Gemini API error:", error);
//         throw new Error("Failed to generate pitch. Try again.");
//     }
// }

// // Helper: parse Gemini text output into structured data
// function parseGeminiResponse(text) {
//     const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
//     const obj = {};

//     for (const line of lines) {
//         if (line.startsWith("Name:")) obj.name = line.replace("Name:", "").trim();
//         else if (line.startsWith("Tagline:")) obj.tagline = line.replace("Tagline:", "").trim();
//         else if (line.startsWith("Pitch:")) obj.pitch = line.replace("Pitch:", "").trim();
//         else if (line.startsWith("Problem:")) obj.problem = line.replace("Problem:", "").trim();
//         else if (line.startsWith("Solution:")) obj.solution = line.replace("Solution:", "").trim();
//         else if (line.startsWith("Audience:")) obj.audience = line.replace("Audience:", "").trim();
//         else if (line.startsWith("HeroTitle:")) obj.heroTitle = line.replace("HeroTitle:", "").trim();
//         else if (line.startsWith("HeroSubtitle:")) obj.heroSubtitle = line.replace("HeroSubtitle:", "").trim();
//     }

//     return Object.keys(obj).length ? obj : null;
// }










// import { GoogleGenerativeAI } from "@google/generative-ai";

// // Initialize Gemini with the API key from .env
// const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// export async function generatePitch({ idea, tone }) {
//   try {
//     // ✅ Use gemini-1.5-flash (browser-friendly)
//     const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

//     const prompt = `
// You are a startup pitch generator called PitchCraft.
// Generate a creative pitch with this structure:

// Name: [startup name]
// Tagline: [short tagline]
// Pitch: [1-2 lines about the idea]
// Problem: [the issue solved]
// Solution: [how it helps]
// Audience: [target users]
// HeroTitle: [headline for landing page]
// HeroSubtitle: [supporting subtitle]

// Idea: ${idea}
// Tone: ${tone}
// `;

//     const result = await model.generateContent(prompt);
//     const text = await result.response.text();

//     console.log("✅ Gemini output:", text);
//     return { raw: text };
//   } catch (error) {
//     console.error("🔥 Gemini API error:", error);
//     throw new Error("Failed to generate pitch. Try again.");
//   }
// }






// src/api/generate.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function generatePitch({ idea, tone }) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `
You are an AI startup pitch generator called PitchCraft.
Respond ONLY in valid JSON with the following keys:
{
  "name": "",
  "tagline": "",
  "pitch": "",
  "problem": "",
  "solution": "",
  "audience": "",
  "heroTitle": "",
  "heroSubtitle": ""
}

Do NOT include markdown, explanation, or extra text.
Use this structure based on:
Idea: ${idea}
Tone: ${tone}
`;

        const result = await model.generateContent(prompt);
        const text = await result.response.text();

        // Try parsing as JSON
        let parsed;
        try {
            parsed = JSON.parse(text);
        } catch {
            // Fallback: extract with regex if Gemini added extra text
            parsed = {
                name: text.match(/"name":\s*"([^"]+)"/)?.[1] || "",
                tagline: text.match(/"tagline":\s*"([^"]+)"/)?.[1] || "",
                pitch: text.match(/"pitch":\s*"([^"]+)"/)?.[1] || "",
                problem: text.match(/"problem":\s*"([^"]+)"/)?.[1] || "",
                solution: text.match(/"solution":\s*"([^"]+)"/)?.[1] || "",
                audience: text.match(/"audience":\s*"([^"]+)"/)?.[1] || "",
                heroTitle: text.match(/"heroTitle":\s*"([^"]+)"/)?.[1] || "",
                heroSubtitle: text.match(/"heroSubtitle":\s*"([^"]+)"/)?.[1] || "",
            };
        }

        console.log("✅ Parsed structured output:", parsed);
        return parsed;
    } catch (error) {
        console.error("🔥 Gemini API error:", error);
        throw new Error("Failed to generate pitch. Try again.");
    }
}
























