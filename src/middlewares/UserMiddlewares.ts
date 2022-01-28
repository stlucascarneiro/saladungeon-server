import bcrypt from "bcrypt";
import { FeedbackMiddlewares } from "./FeedbackMiddlewares";
import { prisma } from "..";

export class UserMiddlewares {
    public static async generateHashPassword(password: string): Promise<string> {
        const hashCost: number = 12;
        const hashPassword: string = await bcrypt.hash(password, hashCost)
        return hashPassword
    }

    public static validateUsername(username: string, throwException?: boolean): boolean {
        const isValid: boolean = username.length > 24 || username.length < 3 || !/[^a-zA-Z0-9\-\/]/.test(username)
        if (!isValid && throwException) FeedbackMiddlewares.throwException('usernameFormatError')
        return isValid
    }

    public static validateEmail(email: string, throwException?: boolean): boolean {
        const isValid: boolean = email.length > 255 || email.length < 8 || /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
        if (!isValid && throwException) FeedbackMiddlewares.throwException('emailFormatError')
        return isValid
    }

    public static validatePassword(password: string, throwException?: boolean): boolean {
        const isValid: boolean = password.length > 24 || password.length < 8 || !/[^a-zA-Z0-9!@#$%&\-\/]/.test(password)
        if (!isValid && throwException) FeedbackMiddlewares.throwException('passwordFormatError')
        return isValid
    }

    public static async validateUniqueUsername(username: string, throwException?: boolean): Promise<boolean> {
        const user = await prisma.user.findUnique({ where: { username } })
        if (user) {
            throwException && FeedbackMiddlewares.throwException('usernameNotUnique')
            return false
        }
        return true
    }

    public static async validateUniqueEmail(email: string, throwException?: boolean): Promise<boolean> {
        const user = await prisma.user.findUnique({ where: { email } })
        if (user) {
            throwException && FeedbackMiddlewares.throwException('emailNotUnique')
            return false
        }
        return true
    }

    public static async authenticatePassword(password: string, hashPassword: string, throwException?: boolean) {
        const isAuthentic = await bcrypt.compare(password, hashPassword)
        if (!isAuthentic && throwException) FeedbackMiddlewares.throwException('userNotFound')
        return isAuthentic
    }
}