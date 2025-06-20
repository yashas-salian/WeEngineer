import { Hono } from "hono";
import { uploadController } from "../controller/upload.controller";

export const uploadRouter = new Hono();

uploadRouter.post('/upload', uploadController.upload)