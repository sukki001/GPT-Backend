import { createClient  } from "redis";

const redisClient = createClient({
    url : process.env.REDIS_URL
});

redisClient.on("error" , (error)=>{
    console.log("Redis Error : " , error);
})

const connectRedis = async ()=>{
    await redisClient.connect();
    console.log("Redis connected Successfully.");
}

export {redisClient , connectRedis};