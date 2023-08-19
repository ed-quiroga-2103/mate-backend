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

    const newUser = await client.users
        .create({
            data: {
                ...data,
                evaluationQty: 0,
                averageGrade: 0,
                grades: [],
                progress: {},
                averageVector: {
                    a: 0,
                    b: 0,
                    c: 0,
                    d: 0,
                },
            },
        })
        .catch((error) => {
            console.log(error); // TODO add error handling
        });

    return newUser;
};

export default register;
