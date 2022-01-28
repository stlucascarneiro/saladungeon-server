export interface IToken {
    accessToken: string
    refreshToken: IRefreshToken
}

export interface IRefreshToken {
    opaqueToken: string
    expireAt: number
}