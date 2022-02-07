import GraphModel from '../database/schemas/Graph';

const getGraph = async (id) => {
    const graph = await GraphModel.findById(id);

    return graph;
};

export default getGraph;
