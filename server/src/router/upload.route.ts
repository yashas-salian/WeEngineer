import { Hono } from "hono";
import { uploadController } from "../controller/upload.controller";
import { ratelimitter } from "../middelware/ratelimmiter.middleware";

export const uploadRouter = new Hono();

uploadRouter.post('/upload', ratelimitter, uploadController.upload)