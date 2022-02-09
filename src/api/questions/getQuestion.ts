import { Request, Response } from 'express';
import { client } from '../../lib/prisma/client';
import { Question } from '../../types';
import { sendRestError } from '../../util';

const getQuestion = async (req: Request, res: Response) => {
    const question = await client.questions
        .findFirst({
            where: {
                id: req.params.id as string,
            },
        })
        .catch((error) => {
            sendRestError(res, 500, {
                message: 'Something went wrong querying your data',
                verbose: 'internal error',
            });

            return undefined;
        });

    if (!question) return;

    res.json({ question });
};

export default getQuestion;
