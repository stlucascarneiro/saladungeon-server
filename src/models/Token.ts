import { IToken, IRefreshToken } from "./interfaces/IToken";
import { IUser } from "./interfaces/IUser";
import jwt from "jsonwebtoken"
import crypto from "crypto"
import moment from "moment";

export class Token implements IToken {
    readonly accessToken: string;
    readonly refreshToken: IRefreshToken;

    constructor(user: IUser) {
        this.accessToken = this.generateAccessToken(user)
        this.refreshToken = this.generateRefreshToken()
    }

    private generateAccessToken(user: IUser): string {
        const payload: IUser = {
            id: user.id,
            username: user.username,
            email: user.email,
            about: user.about,
            contact: user.contact
        }
        const secret: string = String(process.env.JWT_PASSWORD)
        const token: string = jwt.sign(payload, secret, { expiresIn: '1min' })
        return token
    }

    private generateRefreshToken(): IRefreshToken {
        const opaqueToken: string = crypto.randomBytes(24).toString('hex')
        const expireAt = moment().add(1, 'minute').unix()
        return { opaqueToken, expireAt }
    }
}