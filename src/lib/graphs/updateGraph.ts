import GraphModel from '../database/schemas/Graph';

const updateGraph = async (_id, data) => {
    const graph = await GraphModel.findOneAndUpdate({ _id }, data, {
        new: true,
    }).catch((error) => {
        console.log(error);
    });

    return graph;
};

export default updateGraph;
