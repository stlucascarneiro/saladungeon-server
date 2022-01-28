import { IFeedback } from "./interfaces/IFeedback";

export class FeedbackModel {
    // 1x - Success
    static readonly genericSuccess: IFeedback = { statusCode: 10, message: 'Operação realizada' }
    static readonly dataCreated: IFeedback = { statusCode: 11, message: 'Dados adicionados' }
    static readonly userAuthenticated: IFeedback = { statusCode: 12, message: 'Usuário autenticado' }
    static readonly userDisconnected: IFeedback = { statusCode: 13, message: 'Usuário desconectado' }
    static readonly userRefreshed: IFeedback = { statusCode: 14, message: 'Tokens renovados' }
    // 2x - Erro de validação e autenticação
    static readonly genericFormatError: IFeedback = { statusCode: 20, message: 'Formato inválido' }
    static readonly usernameFormatError: IFeedback = { statusCode: 21, message: 'Formato de usuário inválido' }
    static readonly usernameNotUnique: IFeedback = { statusCode: 22, message: 'Nome de usuário já utilizado' }
    static readonly emailFormatError: IFeedback = { statusCode: 23, message: 'Formato de email inválido' }
    static readonly emailNotUnique: IFeedback = { statusCode: 24, message: 'Email já utilizado' }
    static readonly passwordFormatError: IFeedback = { statusCode: 25, message: 'Formato de senha inválido' }
    static readonly userNotFound: IFeedback = { statusCode: 26, message: 'Dados de acesso inválidos' }
    // 3x - Erros do Json Web Token
    static readonly jwtGenericError: IFeedback = { statusCode: 30, message: 'Token inválido' }
    static readonly jwtSignatureError: IFeedback = { statusCode: 31, message: 'Assinatura do Token inválida' }
    static readonly jwtExpiredError: IFeedback = { statusCode: 32, message: 'Token expirado' }
    static readonly jwtUnauthorized: IFeedback = { statusCode: 33, message: 'Token não autorizado' }
    // 4x - Erros do Redis
    static readonly redisGenericError: IFeedback = { statusCode: 40, message: 'Erro de operação do Redis' }
    static readonly redisDuplicateKey: IFeedback = { statusCode: 41, message: 'Chave já existente na base de dados' }
    static readonly redisAccessTokenBlocked: IFeedback = { statusCode: 42, message: 'Access Token bloqueado' }
    static readonly redisRefreshTokenUnknown: IFeedback = { statusCode: 43, message: 'Refresh Token desconhecido' }
}