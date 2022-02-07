import { client } from '../prisma/client';

const login = async (email, password) => {
    const user = await client.users.findFirst({
        where: {
            email,
            password,
        },
    });

    return user;
};

export default login;
