import { Hono } from "hono";
import { userController } from "../controller/user.controller";
import { ratelimitter } from "../middelware/ratelimmiter.middleware";

export const userRouter = new Hono()

userRouter.post('/register' ,ratelimitter, userController.register)
userRouter.post('/login' ,ratelimitter, userController.login)
userRouter.get('/getUser' ,ratelimitter, userController.getUserById)
