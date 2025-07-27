import { Redis } from "@upstash/redis/cloudflare";
import { Context } from "hono";
export class redisSingleton{
    private static instance : Redis | null = null;

    private constructor(){}
    static getInstance (c : Context): Redis{
        if (!this.instance){
            const url = c.env.REDIS_URL
            const token = c.env.REDIS_TOKEN  
            console.log(url , token)   
            if (!url || !token) throw new Error ("Upstash credentials missing")
            try{
                this.instance = new Redis({url , token})
                console.log(' Redis Client created successfully')
            }
            catch(e){
                console.error('error while creating redis client ',e)
                throw new Error(`Failed to create Redis client: ${e instanceof Error ? e.message : 'Unknown error'}`);
            }
        }
        return this.instance
    }

    static async Set(c : Context , key : string , value : Object | number): Promise<void> {
        try {
            const redis = this.getInstance(c)
            await redis.set(key, JSON.stringify(value) , {ex : 3600});          
        } catch (error) {
             console.error("Redis Set Error:", error)
            throw error
        }
        
    }

    static async Get(c : Context , key : string ): Promise<any> {
        try {
            const redis = this.getInstance(c)
            const result = await redis.get(key);  
            return result           
        } catch (error) {
            console.error("Redis get Error:", error)
            throw error           
        }

    }
}