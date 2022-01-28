export type FeedbackTypes =
    // 1x - Success
    'genericSuccess' |
    'dataCreated' |
    'userAuthenticated' |
    'userDisconnected' |
    'userRefreshed' |
    // 2x - Erro de validação e autenticação
    'genericFormatError' |
    'usernameFormatError' |
    'usernameNotUnique' |
    'emailFormatError' |
    'emailNotUnique' |
    'passwordFormatError' |
    'userNotFound' |
    // 3x - Erros do Json Web Token
    'jwtGenericError' |
    'jwtSignatureError' |
    'jwtExpiredError' |
    'jwtUnauthorized' |
    // 4x - Erros do Redis
    'redisGenericError' |
    'redisDuplicateKey' |
    'redisAccessTokenBlocked' |
    'redisRefreshTokenUnknown'