import { Context, Next } from "hono";
import { redisSingleton } from "../db/redis.cache";
import { ratelimitCache } from "../db/ratelimitter.cache";

export const ratelimitter = async ( c : Context , next : Next)=>{
    const LIMIT = 10;
    const WINDOW = 60;

    try{
        const redis = redisSingleton.getInstance(c);
        const ip =  c.req.header("cf-connecting-ip") ??
                    c.req.header("CF-Connecting-IP") ??
                    "127.0.0.1";
        const path = c.req.routePath;
        const cacheKey = `IP:${ip}:${path}`

        const numberOfReqs = ratelimitCache.getIP(cacheKey)

        if (numberOfReqs >= LIMIT) throw new Error("Rate limit")
        
        ratelimitCache.incrementIP(cacheKey , WINDOW)

        // const redisNumberOfReqs = await redisSingleton.Get(c, cacheKey) ?? 0
        // if (Number(redisNumberOfReqs) >= LIMIT) throw new Error("Rate limit")
        // redisSingleton.Set(c, cacheKey , 1 )
        await next()

    }
    catch(e){
        return c.json({
            message : e instanceof Error ? e.message : e , success : false
        }, 429)
    }
}