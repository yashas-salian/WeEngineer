import { Hono } from "hono"
import { quizController } from "../controller/quiz.controller";
import { ratelimitter } from "../middelware/ratelimmiter.middleware";

export const quizRouter = new Hono();

quizRouter.get("/get-questions",ratelimitter , quizController.getQuestions)