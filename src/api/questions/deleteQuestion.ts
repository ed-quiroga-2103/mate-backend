import { Request, Response } from 'express';
import { client } from '../../lib/prisma/client';
import { Question } from '../../types';
import { sendRestError } from '../../util';

const deleteQuestion = async (req: Request, res: Response) => {
    const id = req.params.id as string;

    const question = await client.questions
        .delete({
            where: { id },
        })
        .catch((error) => {
            sendRestError(res, 500, {
                message: 'Something went wrong deleting your data',
                verbose: 'internal error',
            });

            return undefined;
        });

    if (!question) return;

    res.json({ question });
};

export default deleteQuestion;
