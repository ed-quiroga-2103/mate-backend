import { Request, Response } from 'express';
import { client } from '../../lib/prisma/client';
import { Question } from '../../types';
import { sendRestError } from '../../util';

const postQuestion = async (req: Request, res: Response) => {
    const data: Question = req.body;

    const question = await client.questions
        .create({
            data: {
                options: data.options as object[],
                difficulty: data.difficulty,
                course: data.course,
                tags: data.tags,
            },
        })
        .catch((error) => {
            sendRestError(res, 500, {
                message: 'Something went wrong posting your data',
                verbose: 'internal error',
            });

            return undefined;
        });

    if (!question) return;

    res.json({ question });
};

export default postQuestion;
