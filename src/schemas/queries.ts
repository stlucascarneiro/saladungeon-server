import { queryType } from "nexus";
import { prisma } from ".."

export const Query = queryType({
    definition(t) {
        t.list.field('findUsers', {
            type: 'User',
            resolve: async (_, __, ___) => {
                const users = await prisma.user.findMany()
                const response: any = users.map((elem, i) => {
                    return { ...elem, statusCode: i, message: 'teste' }
                })
                return response
            }
        })
    }
})