import { Context } from "hono";
import { generateQuestions } from "../utils/generateQuiz";

export class quizController{
    static async getQuestions (c : Context){
        try {
            const { num_questions , difficulty , time_limit , topic } = await c.req.json()
            const response = await generateQuestions(c, num_questions , difficulty , time_limit , topic) 

            return c.json({
                questions : response
            },200)   
        } catch (error) {
           throw new Error("Something went wrong while genertaing questions") 
        }
    }
}