import { redisBlocklist, redisAllowlist } from "../models/Redis"
import { FeedbackMiddlewares } from "../middlewares/FeedbackMiddlewares"
import jwt from "jsonwebtoken"
import moment from "moment"


export class TokenController {
    // Access Token Methods
    public static validateAccessToken(token: string): void {
        try {
            jwt.verify(token, String(process.env.JWT_PASSWORD))
        } catch (error: any) {
            FeedbackMiddlewares.hadleJWTError(error.message)
        }
    }
    public static getAccessToken(token: string): string | jwt.JwtPayload | null {
        try {
            const payload: string | jwt.JwtPayload = jwt.verify(token, String(process.env.JWT_PASSWORD))
            return payload
        } catch (error: any) {
            return null
        }
    }

    public static async verifyBlockedAccessToken(token: string): Promise<void> {
        const isBlocked = await redisBlocklist.verifyExistentKey(token)
        if (isBlocked) FeedbackMiddlewares.throwException('redisAccessTokenBlocked')
    }

    public static async blockAccessToken(token: string): Promise<void> {
        const expireAt = moment().add(1, 'minute').unix()
        await redisBlocklist.addKey(token, '', expireAt)
    }

    // Refresh Token Methods
    public static async validateRefreshToken(key: string): Promise<void> {
        const userId: String | null = await redisAllowlist.getKeyValue(key)
        if (!userId) {
            FeedbackMiddlewares.throwException('redisRefreshTokenUnknown')
        }
    }

    public static async getRefreshToken(key: string): Promise<String | null> {
        const userId: String | null = await redisAllowlist.getKeyValue(key)
        if (!userId) {
            return null;
        }
        return userId
    }

    public static async deleteRefreshToken(key: string): Promise<void> {
        await redisAllowlist.deleteKey(key)
    }
}