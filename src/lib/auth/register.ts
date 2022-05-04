import { users } from '@prisma/client';
import { client } from '../prisma/client';
const register = async (data: users) => {
    const exists = await client.users.findFirst({
        where: {
            email: data.email,
        },
    });

    if (exists) {
        return undefined;
    }

    console.log(data);

    const newUser = await client.users
        .create({
            data: {
                ...data,
                progress: {},
            },
        })
        .catch((error) => {
            console.log(error); // TODO add error handling
        });

    return newUser;
};

export default register;
