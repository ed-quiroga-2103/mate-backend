import { Request, Response } from 'express';
import { client } from '../../lib/prisma/client';
import { Question } from '../../types';
import { sendRestError } from '../../util';

const postQuestion = async (req: Request, res: Response) => {
    const data: Question = req.body;

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

    const question = await client.questions
        .create({
            data: {
                text: data.text,
                options: data.options as object[],
                difficulty: data.difficulty,
                tags: data.tags,
                courseId: course.id,
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
