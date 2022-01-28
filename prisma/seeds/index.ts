import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

import { dataUsers } from "./users";
import { dataAvatars } from "./avatars";
import { dataPosts } from "./posts";
import { dataFavorites } from "./favorites";
import { dataReports } from "./reports";

async function main() {
    const newDataUsers = await dataUsers()
    await prisma.user.createMany(newDataUsers)
    await prisma.avatar.createMany(dataAvatars)
    await prisma.post.createMany(dataPosts)
    await prisma.favorite.createMany(dataFavorites)
    await prisma.report.createMany(dataReports)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })