import { client } from '../prisma/client';
import { Prisma, users } from '@prisma/client';

const addGrade = async (result, user: users) => {
    const newGrades = user.grades;

    const newGrade = {
        ...result,
        date: new Date(),
    } as unknown as Prisma.JsonValue;

    newGrades.push(newGrade);

    const newQty = user.evaluationQty + 1;
    const newAverage =
        (user.averageGrade * user.evaluationQty + result.percentage) / newQty;

    await client.users.update({
        where: {
            id: user.id,
        },
        data: {
            grades: newGrades,
            averageGrade: newAverage,
            evaluationQty: newQty,
        },
    });

    return newGrade;
};

export default addGrade;
