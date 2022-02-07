import { client } from '../prisma/client';

const getGraph = async (id) => {
    const graph = await client.graphs.findUnique({
        where: {
            id,
        },
    });

    return graph;
};

export default getGraph;
