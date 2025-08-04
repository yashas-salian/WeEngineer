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

    static async getFillteredPdf(c : Context){
        try {
            const college_name = await c.req.query('college_name')
            const Examtype = await c.req.query('Examtype')
            const year = await c.req.query('year')
            const subject_name = await c.req.query('subject_name')

            const filter : any = {}
            if (college_name) filter.college_name = college_name
            if (Examtype) filter.Examtype = Examtype
            if (year) filter.year = year
            if (subject_name) filter.subject_name = subject_name

            const prisma = getPrismaClient(c.env.DATABASE_URL)

            const response = await prisma.pdf.findMany({
                where : filter
            })

            if (!response){
                return c.json({
                    message : "Pdf for the following filter is not found / Db call failed",
                    success : false
                },404) 
            }

            if (response.length == 0){
                return c.json({
                    message : "Pdf for the following filter is not found",
                    success : false
                },404) 
            }

            return c.json({
                message : "Pdf/pdf's found",
                response,
                success : true
            },200) 

        } catch (error) {
            return c.json({
                error : true,
                message : error instanceof Error ? error.message : "unknown error",
                success : false
            },500)
        }
    }
}