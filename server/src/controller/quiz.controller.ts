import { Context } from "hono";
import { generateQuestions } from "../utils/generateQuiz";

export class quizController{
    static async getQuestions (c : Context){
        try {
            const num_questions = c.req.query('num_questions') || ""
            const difficulty = c.req.query('difficulty') || ""
            const time_limit = c.req.query('time_limit') || ""
            const topic = c.req.query('topic') || ""
            const response = await generateQuestions(c, num_questions, topic , difficulty , time_limit) 

            return c.json({
                questions : response
            },200)   
        } catch (error) {
           throw new Error("Something went wrong while genertaing questions") 
        }
    }
}