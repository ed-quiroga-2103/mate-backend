import { client } from '../prisma';

const getAllusers = async () => {
    return await client.users.findMany();
};

export default { getAllusers };
