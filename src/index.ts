import { ApolloServer } from "apollo-server";
import { PrismaClient } from "@prisma/client";
import { config as configDotenv } from "dotenv";
import { connectRedis } from "./models/Redis"
import { schema } from "./schemas/index";

configDotenv()
connectRedis()

export const prisma = new PrismaClient({ log: ['query'] })

const server = new ApolloServer({ schema, context: { prisma } })
server.listen({ port: 4000 }, () => console.log('Servidor rodando na porta 4000'))