import { users } from '@prisma/client';
import { client } from '../prisma/client';

const addGlobalAverage = async (
    evalVector: {
        a: number;
        b: number;
        c: number;
        d: number;
    },
    user: users
) => {
    const newVector = {
        a: user.averageVector['a'] + evalVector.a,
        b: user.averageVector['b'] + evalVector.b,
        c: user.averageVector['c'] + evalVector.c,
        d: user.averageVector['d'] + evalVector.d,
    };

    const updated = await client.users.update({
        where: {
            id: user.id,
        },
        data: {
            averageVector: newVector,
        },
    });

    return updated;
};
