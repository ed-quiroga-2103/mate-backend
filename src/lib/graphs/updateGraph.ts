import { client } from '../prisma/client';

const updateGraph = async (id, data) => {
    const graph = await client.graphs
        .update({
            where: {
                id,
            },
            data,
        })
        .catch((error) => {
            console.log(error);
        });

    return graph;
};

export default updateGraph;
