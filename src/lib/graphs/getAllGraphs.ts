import { GraphFilters } from '../../types';
import { client } from '../prisma/client';

const getAllGraphs = async (filters?: GraphFilters) => {
    const filterParam = {};

    if (filters) {
        const result = await client.graphs.findMany({
            where: filters,
        });

        return result;
    }

    const result = await client.graphs.findMany();

    return result;
};

export default getAllGraphs;
