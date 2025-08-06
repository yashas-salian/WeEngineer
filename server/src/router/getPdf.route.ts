import { Hono } from "hono";
import { getPdfController } from "../controller/getPdf.controller";
import { ratelimitter } from "../middelware/ratelimmiter.middleware";

export const pdfRouter = new Hono()

pdfRouter.get('/get-all-pdf', ratelimitter, getPdfController.getAllPdf)
pdfRouter.get('/get-pdf',ratelimitter,getPdfController.getFillteredPdf)
pdfRouter.get('/get-pdf-stats',ratelimitter,getPdfController.getPdfStats)