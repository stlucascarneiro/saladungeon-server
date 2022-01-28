import { createClient } from "redis";
import { RedisDatabases, EnumRedisDatabases } from "./types/Redis";

const client = createClient()

class RedisClient {
    private database: number

    constructor(database: RedisDatabases) {
        this.database = EnumRedisDatabases[database]
    }

    public static async connectRedis() {
        await client.connect()
    }

    public async addKey(key: string, value: string, expireAt: any): Promise<void> {
        client.select(this.database)
        client.set(key, value, expireAt)
        client.expireAt(key, expireAt)
    }

    public async getKeyValue(key: string): Promise<String | null> {
        client.select(this.database)
        return await client.get(key)
    }

    public async verifyExistentKey(key: string): Promise<number> {
        client.select(this.database)
        return await client.exists(key)
    }

    public async deleteKey(key: string): Promise<void> {
        client.select(this.database)
        await client.del(key)
    }
}

export const connectRedis = RedisClient.connectRedis
export const redisBlocklist: RedisClient = new RedisClient('blocklist')
export const redisAllowlist: RedisClient = new RedisClient('allowlist')