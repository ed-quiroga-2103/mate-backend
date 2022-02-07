import { client } from '../prisma/client'

const createGraph = async (data) => {
    const exists = await client.graphs.findFirst({
        where: {
            id: data._id,
        },
    })

    if (exists) {
        return undefined
    }

    const newUser = await client.graphs
        .create({
            data,
        })
        .catch((error) => {
            console.log(error)
        })

    return newUser
}

export default createGraph
