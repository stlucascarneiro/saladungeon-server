import { makeSchema, mutationType, objectType, queryType } from "nexus";

export const User = objectType({
    name: "User",
    definition(t) {
        t.int('id')
        t.string('username')
        t.string('email')
        t.string('password')
        t.string('about')
        t.string('contact')
        t.string('createdAt')
        t.string('updatedAt')
        t.int('statusCode')
        t.string('message')
    }
})

export const Post = objectType({
    name: 'Post',
    definition(t) {
        t.int('id')
        t.string('content')
        t.string('user')
        t.string('genre')
        t.string('category')
        t.string('tags')
        t.string('createdAt')
        t.string('Favorite')
        t.string('Report')
        t.int('statusCode')
        t.string('message')
        t.field('_count', {
            type: CountFavorite,
            resolve: (parent: any) => {
                return parent._count
            }
        })
    }
})

export const Favorite = objectType({
    name: "Favorite",
    definition(t) {
        t.int('id')
        t.string('post')
        t.string('user')
        t.string('createdAt')
        t.int('statusCode')
        t.string('message')
    }
})
export const Report = objectType({
    name: "Report",
    definition(t) {
        t.int('id')
        t.string('type')
        t.string('post')
        t.string('user')
        t.string('createdAt')
        t.int('statusCode')
        t.string('message')
    }
})
export const Token = objectType({
    name: "Token",
    definition(t) {
        t.string('accessToken')
        t.string('refreshToken')
        t.string('statusCode')
        t.string('message')
    }
})

export const CountFavorite = objectType({
    name: "CountFavorite",
    definition(t) {
        t.int("Favorite")
    }
})