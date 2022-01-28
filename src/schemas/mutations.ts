import { mutationType, nonNull, stringArg } from "nexus";
import { FeedbackMiddlewares } from "../middlewares/FeedbackMiddlewares";
import { UserController } from "../controllers/UserController";

export const Mutation = mutationType({
    definition(t) {
        t.list.field('createUser', {
            type: 'User',
            args: {
                username: nonNull(stringArg()),
                email: nonNull(stringArg()),
                password: nonNull(stringArg())
            },
            resolve: async (_, { username, email, password }) => {
                const createdUser = await UserController.create(username, email, password)
                const feedback = FeedbackMiddlewares.getFeedback('dataCreated')
                return [
                    { ...createdUser, ...feedback }
                ]
            }
        })
        t.list.field('authenticateUser', {
            type: 'Token',
            args: {
                username: stringArg(),
                email: stringArg(),
                password: nonNull(stringArg()),
            },
            resolve: async (_, { username, email, password }) => {
                const token: any = await UserController.authenticate(username, email, password)
                const feedback: any = FeedbackMiddlewares.getFeedback('userAuthenticated')
                return [{
                    accessToken: token.accessToken,
                    refreshToken: token.refreshToken.opaqueToken,
                    ...feedback
                }]
            }
        })
        t.list.field('logoutUser', {
            type: "Token",
            args: {
                accessToken: nonNull(stringArg()),
                refreshToken: nonNull(stringArg())
            },
            resolve: async (_, { accessToken, refreshToken }) => {
                await UserController.logout(accessToken, refreshToken)
                const feedback: any = FeedbackMiddlewares.getFeedback('userDisconnected')
                return [{ ...feedback }]
            }
        })
        t.list.field('refreshUser', {
            type: 'Token',
            args: {
                refreshToken: nonNull(stringArg())
            },
            resolve: async (_, { refreshToken }) => {
                const token = await UserController.refresh(refreshToken)
                const feedback: any = FeedbackMiddlewares.getFeedback('userRefreshed')
                return [{
                    accessToken: token.accessToken,
                    refreshToken: token.refreshToken.opaqueToken,
                    ...feedback
                }]
            }
        })
    }
})
