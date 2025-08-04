import { Context } from "hono";
import { loginSchema, registerSchema } from "../model/user.model";
import { getPrismaClient } from "../db/prisma";
import { redisSingleton } from "../db/redis.cache";
import { Webhook } from "svix";
import { WebhookEvent , User } from "@clerk/clerk-sdk-node";

export class userController {
    static async register( c:Context , data : object ){
        try{
            const webhookSecret = c.env.WEBHOOK_SECRET;
            console.log("webhookSecret")
            if (!webhookSecret) {
                return c.json(
                {
                    message: "Webhook secret is not configured!",
                },
                500
                );
            }

            const payload = await c.req.text();
            const svix_id = c.req.header("svix-id");
            const svix_timestamp = c.req.header("svix-timestamp");
            const svix_signature = c.req.header("svix-signature");

            let event: WebhookEvent;
            console.log("payload = ",payload)
            try {
                const wh = new Webhook(webhookSecret);
                event = wh.verify(payload, {
                "svix-id": svix_id as string,
                "svix-timestamp": svix_timestamp as string,
                "svix-signature": svix_signature as string,
                }) as WebhookEvent;

                if(event.type === "user.created"){
                    const prisma  =  getPrismaClient(c.env.DATABASE_URL)
                    let email = ""
                    if(event.data.email_addresses && event.data.email_addresses.length > 0){
                        email = event.data.email_addresses[0]?.email_address || ""
                    }
                    const username = event.data.username || ""
                    const ID = event.data.id.toString() || ""
                    const user = await prisma.user.create({
                        data : {
                            username,
                            email,
                            ID
                        }
                    })
                    if (!user){
                        return c.json({
                        message : 'registration Unsuccessfull',
                        success : false
                        },400)
                    }
                    console.log('user =', user )
                    return c.json({
                        message : 'registration Successfull',
                        success : true,
                        data : user
                        },200)
                }
            } catch (e) {
                return c.json({
                error : true,
                message : e instanceof Error ? e.message : "unknown error",
                success : false,
                payload,
                webhookSecret
            },500)
            }
        }
        catch(e){

            const payload = await c.req.json();
            return c.json({
                error : true,
                message : e instanceof Error ? e.message : "unknown error",
                success : false,
                payload,
            },500)
        }
    }
    
    static async login( c:Context ){
        try{
            const body = await c.req.json()
            const isvalid  = loginSchema.safeParse(body)
            if (!isvalid.success){
                return c.json({
                    message : 'Invalid inputs'
                })
            }
            const prisma  =  getPrismaClient(c.env.DATABASE_URL)
            console.log("prisma client created")
            const userFound = await prisma.user.findFirst({
                where : {
                    email: body.email,
                    password : body.password
                }
            })
            // console.log('test 1')
            if (!userFound){
                return c.json({
                message : 'Login Unsuccessfull',
                success : false
                },400)
            }
            return c.json({
                ID : userFound.ID,
                userDetails : userFound,
                message : 'Login Successfull',
                success : true
            },201)
        }
        catch(e){
            return c.json({
                error : true,
                message : e instanceof Error ? e.message : "Unknown error",
                success : false
            },500)
        }
    }

    static async getUserById(c:Context){
        try{
            const {id} = c.req.query()
            if (!id){
                return c.json({
                    message: "ID not given",
                    success : false,
                }, 500)
            }
            const cacheKey = `user:${id}`
            console.log('cache key=',cacheKey)
            const redis = redisSingleton.getInstance(c)
            const redisData = await redisSingleton.Get(c,cacheKey)
            if (redisData){
                return c.json({
                    message: "User details fetched successfully",
                    data : redisData,
                    success : true,                                 
                    method : "Redis hit"
                }, 200)
            }
            console.log("redis miss")
            const prisma = getPrismaClient(c.env.DATABASE_URL)
            console.log("prisma ckient creatred")
            const data = await prisma.user.findUnique({
                where:{
                    ID : id
                }
            })
            if (!data) throw new Error("User not found")
            await redisSingleton.Set(c, cacheKey, data)
            return c.json({
                    message: "User details fetched successfully",
                    data : data,
                    success : true,
                    method : "Database hit"
                }, 200)
        }
        catch(e){
            console.error(e)
            return c.json({
                error : true,
                message : e instanceof Error ? e.message : "Unknown error",
                success : false
            },500)
        }
    }
}