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
        const redis = this.getInstance(c)
        await redis.set(key, JSON.stringify(value) , {ex : 3600});
    }

    static async Get(c : Context , key : string ): Promise<any> {
        const redis = this.getInstance(c)
        return await redis.get(key);
    }
}