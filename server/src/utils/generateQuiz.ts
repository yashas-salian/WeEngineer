import { GoogleGenAI } from "@google/genai"
import { Context } from "hono"

export const generateQuestions = async( c : Context , num_questions :string ,topic :string , difficulty : string, time_limit : string) => {
    const model = new GoogleGenAI({apiKey : c.env.GOOGLE_GEMINI_API_KEY})
    
                const prompt = `You are an expert educational content generator. Generate ${num_questions} unique and non-repeating questions based on the topic ${topic}. Each question should be of ${difficulty} difficulty. The user has a total time limit of ${time_limit} minutes to complete the quiz.
    
                    Important instructions:
                    - Ensure that no two questions focus on the exact same subtopic.
                    - Include a diverse range of subtopics within the main topic.
                    - Focus on conceptual understanding, not rote memorization.
                    - Format the response strictly in JSON as follows:
    
                    {
                    "topic": ${topic},
                    "difficulty": ${difficulty},
                    "time_limit_minutes": ${time_limit},
                    "questions": [
                        {
                        "question": "Question text here",
                        "options": ["Option A", "Option B", "Option C", "Option D"],
                        "correct_answer": "Option B",
                        "explanation": "Brief explanation of the correct answer"
                        },
                        ...
                    ]
                    }
    
            Do not include any markdown or natural language outside of the JSON. Only return the JSON object.`
                const response = await model.models.generateContent({
                    model: 'gemini-2.0-flash',
                    contents: prompt,
                }) 
                const text = response?.candidates?.[0]?.content?.parts?.[0]?.text
                if(!text) throw new Error ("Prompt not found")
                const cleaned = text.replace(/```json\n?/, '').replace(/```$/, '')
                const parsedResponse = JSON.parse(cleaned)
                // parsedResponse.questions?.[0] ----> this is how you access individual questions
                return parsedResponse;
}