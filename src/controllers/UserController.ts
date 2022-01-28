import { prisma } from "..";
import { UserMiddlewares } from "../middlewares/UserMiddlewares";
import { IUser } from "../models/interfaces/IUser";
import { Token } from "../models/Token";
import { FeedbackMiddlewares } from "../middlewares/FeedbackMiddlewares";
import { TokenController } from "./TokenController";
import { redisAllowlist } from "../models/Redis";

export class UserController {
    public static async create(username: string, email: string, password: string): Promise<IUser> {
        UserMiddlewares.validateUsername(username, true)
        UserMiddlewares.validateEmail(email, true)
        UserMiddlewares.validatePassword(password, true)

        await UserMiddlewares.validateUniqueUsername(username, true)
        await UserMiddlewares.validateUniqueEmail(email, true)

        const hashPassword: string = await UserMiddlewares.generateHashPassword(password)

        await prisma.user.create({
            data: {
                username,
                email,
                password: hashPassword
            }
        })

        return {
            username,
            email,
            password: hashPassword
        }
    }

    public static async authenticate(username: string | undefined | null, email: string | undefined | null, password: string): Promise<Token> {
        let user: any;
        if (username && UserMiddlewares.validateUsername(username, true)) {
            user = await prisma.user.findUnique({ where: { username } })
        } else if (email && UserMiddlewares.validateEmail(email, true)) {
            user = await prisma.user.findUnique({ where: { email } })
        }
        if (!user) FeedbackMiddlewares.throwException('userNotFound')

        UserMiddlewares.validatePassword(password, true)
        await UserMiddlewares.authenticatePassword(password, user.password, true)

        const token = new Token(user)
        redisAllowlist.addKey(token.refreshToken.opaqueToken, user.id, token.refreshToken.expireAt)
        return token
    }

    public static async logout(accessToken: string, refreshToken: string): Promise<void> {
        await TokenController.verifyBlockedAccessToken(accessToken)
        TokenController.validateAccessToken(accessToken)
        await TokenController.blockAccessToken(accessToken)
        await TokenController.validateRefreshToken(refreshToken)
        await TokenController.deleteRefreshToken(refreshToken)
    }

    public static async refresh(refreshToken: string): Promise<Token> {
        await TokenController.validateRefreshToken(refreshToken)
        const userId: String | null = await TokenController.getRefreshToken(refreshToken)
        await TokenController.deleteRefreshToken(refreshToken)

        const user: any = await prisma.user.findUnique({ where: { id: Number(userId) } })
        if (!user) FeedbackMiddlewares.throwException('userNotFound')

        const token = new Token(user)
        await redisAllowlist.addKey(token.refreshToken.opaqueToken, user.id, token.refreshToken.expireAt)

        return token
    }
}