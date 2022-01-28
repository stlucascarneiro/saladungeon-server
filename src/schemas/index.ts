import { makeSchema, mutationType } from "nexus";
import { User, Post, Favorite, Report, Token, CountFavorite } from "./objects";
import { Query } from "./queries";
import { Mutation } from "./mutations";
import { UserController } from "../controllers/UserController";
import path from "path";

export const schema = makeSchema({
    types: [User, Post, Favorite, Report, Token, CountFavorite, Query, Mutation],
    outputs: {
        schema: path.join(__dirname, 'schema.graphql'),
        typegen: path.join(__dirname, '../../prisma/generated', 'nexus.ts')
    }
})