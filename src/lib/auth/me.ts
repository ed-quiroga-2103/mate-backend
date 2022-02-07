import { client } from '../prisma/client';

const me = async (email) => {
    const user = await client.users.findFirst({
        where: {
            email,
        },
    });

    return user;
};

export default me;
