import { Prisma, PrismaClient } from "@prisma/client";


const client = new PrismaClient()

const connect = async () => {
    await client.$connect()
}

export {
    connect,
    client
}