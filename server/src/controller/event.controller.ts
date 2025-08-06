import { Context } from "hono";
import { addEventSchema } from "../model/event.model";
import { getPrismaClient } from "../db/prisma";

export class eventController{
    static async addEvent(c : Context){
        try {
            const body = await c.req.json()
            const id = c.req.query("id")
            if(!id){
                return c.json({
                    message : "ID not found",
                    success : false
                },500)
            }
            const valid = addEventSchema.safeParse(body)
            if (!valid.success){
                return c.json({
                    message : "Parsing error",
                    success : false
                },500)
            }
            const prisma  = getPrismaClient(c.env.DATABASE_URL)
            const response = await prisma.event.create({
                data : {
                    title : body.title,
                    description : body.description,
                    dueDate : body.dueDate,
                    type : body.type,
                    userID : id
                }
            })

            if(!response){
                throw new Error()
            }

            return c.json({
                message : "Event added successfully",
                response,
                success : true
            },200)

        } catch (error) {
            return c.json({
                error : true,
                message : error instanceof Error ? error.message : "Unkwown error",
                success : false
            },500)
        }
    }

    static async getEvent(c : Context){
        try {
            const id = c.req.query("id")
            if(!id){
                return c.json({
                    message : "ID not found",
                    success : false
                },500)
            }

            const prisma = getPrismaClient(c.env.DATABASE_URL)
            const response = await prisma.event.findMany({
                where : {
                    userID : id
                }
            }) 
            if(!response){
                throw new Error()
            }
            if(response.length == 0){
                return c.json({
                    message : "No upcoming events",
                    response,
                    success : true
                },200)
            }
            return c.json({
                message : "Event fetched successfully",
                response,
                success : true
            },200)


        } catch (error) {
            return c.json({
                error : true,
                message : error instanceof Error ? error.message : "Unkwown error",
                success : false
            },500)
        }

    }

    static async update(c : Context){
        try{
            const eventID = c.req.query("id")
            if(!eventID) {
                return c.json({
                message : "ID not found",
                success : false
                },500)
            }

            const body = await c.req.json()
            const prisma = getPrismaClient(c.env.DATABASE_URL)
            const response = await prisma.event.update({
                where : {
                    id : Number(eventID)
                },
                data : {
                    title : body.title,
                    description : body.description,
                    dueDate : body.dueDate,
                    type: body.type
                }
            })

            if(!response){
                    return c.json({
                    message : "Event update failed",
                    success : false
                },400)
            }

            return c.json({
                message : "Event updated successfully",
                response,
                success : true
            },200)
            
        }catch(error){
            return c.json({
                message : "Update failed due to error",
                error : error instanceof Error ? error.message : "Unknown error",
                success : false
            },500)
        }
    }
    
    static async delete(c : Context){
        try{
            const eventID = c.req.query("id")
            if(!eventID) {
                return c.json({
                message : "ID not found",
                success : false
                },500)
            }
            
            const prisma = getPrismaClient(c.env.DATABASE_URL)
            const response = await prisma.event.delete({
                where : {
                    id : Number(eventID)
                }
            })

            if(!response){
                    return c.json({
                    message : "Event deletion failed",
                    success : false
                },400)
            }

            return c.json({
                message : "Event deleted successfully",
                response,
                success : true
            },200)
            
        }catch(error){
            return c.json({
                message : "deletion failed due to error",
                error : error instanceof Error ? error.message : "Unknown error",
                success : false
            },500)
        }
    }
}