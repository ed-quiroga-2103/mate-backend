import GraphModel from '../database/schemas/Graph';

const getAllGraphs = async (filter?) => {
    const filterParam = {};

    if (filter) {
        filterParam[`${filter.field}`] = {
            $regex: `${filter.value}`,
            $options: 'i',
        };
    }

    const graphs = await GraphModel.find(filterParam);

    return graphs;
};

export default getAllGraphs;
