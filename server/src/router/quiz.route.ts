import { Hono } from "hono"
import { quizController } from "../controller/quiz.controller";

export const quizRouter = new Hono();

quizRouter.get("/get-questions" , quizController.getQuestions)