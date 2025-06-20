import { Context } from "hono";
import { loginSchema, registerSchema } from "../model/user.model";
import { getPrismaClient } from "../db/prisma";
import { redisSingleton } from "../db/redis.cache";

export class userController {
    static async register( c:Context ){
        try{
            const body = await c.req.json()
            const isvalid  = registerSchema.safeParse(body)
            if (!isvalid.success){
                return c.json({
                    message : 'Invalid inputs'
                })
            }
            const prisma  =  getPrismaClient(c.env.DATABASE_URL)
            console.log("prisma client created")

            const existingUser = await prisma.user.findFirst({
                where : {
                    email: body.email
                }
            })

            if (existingUser){
                return c.json({
                message : 'User with email already exists'
            },400)
            }

            const user = await prisma.user.create({
                data : {
                    username : body.username,
                    password : body.password,
                    email : body.email,
                }
            })
            if (!user){
                return c.json({
                message : 'registration Unsuccessfull',
                success : false
                },400)
            }

            return c.json({
                ID : user.ID,
                userDetails : user, 
                message : 'Register Successfull',
                success : true
            },201)
        }
        catch(e){
            return c.json({
                error : e instanceof Error,
                message : 'Some error occured',
                success : false
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
                error : e instanceof Error,
                message : 'Some error occured',
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
                    ID : Number(id)
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
                error : e instanceof Error,
                message : 'Some error occured',
                success : false
            },500)
        }
    }
}