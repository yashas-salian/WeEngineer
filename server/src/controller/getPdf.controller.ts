import { Context } from "hono";
import { getPrismaClient } from "../db/prisma";
import { redisSingleton } from "../db/redis.cache";

export class getPdfController{
    static async getAllPdf(c : Context){
        try{
            console.log("Before Redis")
            const cacheKey = 'Allpdfs'
            const redisResponse = await redisSingleton.Get(c, cacheKey)
            console.log("Redis get")
            if (redisResponse){
                return c.json({
                    message : "All pdf fetched successfully",
                    redisResponse,
                    method : "Redis hit",
                    success : true
                },200)
            }
            console.log("After Redis")
            const prisma  = getPrismaClient(c.env.DATABASE_URL)
            const response = await prisma.pdf.findMany()

            if (!response){
                throw new Error("Database hit failed")
            }
            redisSingleton.Set(c, cacheKey, response)
            return c.json({
                message : "All pdf fetched successfully",
                response,
                method : "DB call",
                success : true
            },200)
        }
        catch(e){
            return c.json({
                error: true,
                message: e instanceof Error ? e.message : "Unknown error",
                success: false
            },500)
        }

    }

    static async getAllPdfBasedOnCollege(c : Context){
        try {
            const college_name = await c.req.query('college_name')
            // const isValid = getAllPdfBasedOnCollegeSchema.safeParse(body)

            // if(!isValid) throw new Error ("Invalid values passed")
            
            const prisma = getPrismaClient(c.env.DATABASE_URL)

            const data =  await prisma.pdf.findMany({
                where :{
                    college_name
                }
            })
            
            if (!data || data.length == 0){
                return c.json({
                    message : "No pdf with college name found",
                    success : false,
                },400)
            }

            return c.json({
                message : "Pdf's found",
                data,
                success : true,
            },200)
                
        } catch (e) {
            return c.json({
                error : e instanceof Error,
                message : "Some error occured",
                success : false
            },500)
        }
    }  
    
    static async getAllPdfBasedOnYearAndCollege(c : Context){
        try {
            const college_name = await c.req.query('college_name')
            const year = await c.req.query('year')
            // const isValid = getAllPdfBasedOnYearAndCollegeSchema.safeParse(body)

            // if(!isValid) throw new Error ("Invalid values passed")
            
            const prisma = getPrismaClient(c.env.DATABASE_URL)

            const data =  await prisma.pdf.findMany({
                where :{
                    college_name ,
                    year
                }
            })

            if (!data || data.length == 0){
                return c.json({
                    message : "No pdf with college name and exam year found",
                    success : false,
                },400)
            }

            return c.json({
                message : "Pdf's found",
                data,
                success : true,
            },200)
                
        } catch (e) {
            return c.json({
                error : e instanceof Error,
                message : "Some error occured",
                success : false
            },500)
        }
    }

    static async getAllPdfBasedOnExamTypeAndCollege(c : Context){
        try {
            const college_name = await c.req.query('college_name')
            const Examtype = await c.req.query('Examtype')
            // const isValid = getAllPdfBasedOnExamTypeAndCollegeSchema.safeParse(body)

            // if(!isValid) throw new Error ("Invalid values passed")
            
            const prisma = getPrismaClient(c.env.DATABASE_URL)

            const data =  await prisma.pdf.findMany({
                where :{
                    college_name ,
                    Examtype
                }
            })

            if (!data || data.length == 0){
                return c.json({
                    message : "No pdf with college name and exam-type found",
                    success : false,
                },400)
            }

            return c.json({
                message : "Pdf's found",
                data,
                success : true,
            },200)
                
        } catch (e) {
            return c.json({
                error : e instanceof Error,
                message : "Some error occured",
                success : false
            },500)
        }
    }
    static async getAllPdfBasedOnExamTypeAndCollegeAndYear(c : Context){
        try {
            const college_name = await c.req.query('college_name')
            const Examtype = await c.req.query('Examtype')
            const year = await c.req.query('year')
            // const isValid = getAllPdfBasedOnExamTypeAndCollegeAndYearSchema.safeParse(body)

            // if(!isValid) throw new Error ("Invalid values passed")
            
            const prisma = getPrismaClient(c.env.DATABASE_URL)

            const data =  await prisma.pdf.findMany({
                where :{
                    college_name ,
                    Examtype ,
                    year 
                }
            })

            if (!data || data.length == 0){
                return c.json({
                    message : "No pdf with college name, year and exam-type found",
                    success : false,
                },400)
            }

            return c.json({
                message : "Pdf's found",
                data,
                success : true,
            },200)
                
        } catch (e) {
            return c.json({
                error : e instanceof Error,
                message : "Some error occured",
                success : false
            },500)
        }
    }
}