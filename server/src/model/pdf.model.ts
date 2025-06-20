
//not used since using this in get req is not acceptable , we used query params
import {z} from "zod"

export const getAllPdfBasedOnCollegeSchema = z.object({
        college_name : z.string()
    })

export const getAllPdfBasedOnYearAndCollegeSchema = z.object({
    college_name : z.string(),
    year : z.string()
})

export const getAllPdfBasedOnExamTypeAndCollegeSchema = z.object({
    college_name : z.string(),
    ExamType : z.string()
})

export const getAllPdfBasedOnExamTypeAndCollegeAndYearSchema = z.object({
    college_name : z.string(),
    ExamType : z.string(),
    year : z.string()
})