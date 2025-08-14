import { createClient } from 'redis';
import { envStrings } from '../../config/env.config';

export const redisClient = createClient({
    username: envStrings.REDIS_USERNAME || undefined,
    password: envStrings.REDIS_PASSWORD || undefined,
    socket: {
        host: envStrings.REDIS_HOST,
        port: Number(envStrings.REDIS_PORT)
    }
});

// export const redisClient = createClient({
//   socket: {
//     host: envStrings.REDIS_HOST,
//     port: Number(envStrings.REDIS_PORT),
//   },
//   ...(envStrings.REDIS_PASSWORD && { password: envStrings.REDIS_PASSWORD }),
//   ...(envStrings.REDIS_USERNAME && { username: envStrings.REDIS_USERNAME }),
// } );

// console.log(redisClient)

redisClient.on('error', err => console.log('Redis Client Error', err));



// await client.set('foo', 'bar');
// const result = await client.get('foo');
// console.log(result)  // >>> bar


export const connectRedis = async () => {
    if (!redisClient.isOpen) {
        await redisClient.connect();
        console.log("Redis Connected ✅");
    }
}
