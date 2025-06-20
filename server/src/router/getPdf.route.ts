import { Hono } from "hono";
import { getPdfController } from "../controller/getPdf.controller";
import { ratelimitter } from "../middelware/ratelimmiter.middleware";

export const pdfRouter = new Hono()

pdfRouter.get('/get-all-pdf', ratelimitter, getPdfController.getAllPdf)
pdfRouter.get('/get-pdf-for-college', ratelimitter, getPdfController.getAllPdfBasedOnCollege)
pdfRouter.get('/get-pdf-for-college-and-year', ratelimitter, getPdfController.getAllPdfBasedOnYearAndCollege)
pdfRouter.get('/get-pdf-for-college-and-exam-type', ratelimitter, getPdfController.getAllPdfBasedOnExamTypeAndCollege)
pdfRouter.get('/get-pdf-for-college-and-exam-type-and-year', ratelimitter, getPdfController.getAllPdfBasedOnExamTypeAndCollegeAndYear)