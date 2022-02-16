import { Request, Response } from 'express';
import { client } from '../../lib/prisma/client';
import { Question } from '../../types';
import { sendRestError } from '../../util';

const updateQuestion = async (req: Request, res: Response) => {
    const data: Question = req.body;
    const id = req.params.id as string;

    let courseId;

    if (data.course) {
        const course = await client.course.findFirst({
            where: {
                code: data.course,
            },
        });

        if (!course) {
            sendRestError(res, 400, {
                message: 'No course exists with the provided code',
                verbose: 'data missing',
            });
            return;
        }

        courseId = course.id;
    }

    const question = await client.questions
        .update({
            where: {
                id,
            },
            data: {
                courseId,
                options: data.options as object[],
                difficulty: data.difficulty,
                tags: data.tags,
            },
        })
        .catch((error) => {
            sendRestError(res, 500, {
                message: 'Something went wrong updating your data',
                verbose: 'internal error',
            });

            return undefined;
        });

    if (!question) return;

    res.json({ question });
};

export default updateQuestion;
