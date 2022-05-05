import { Request, Response } from 'express';
import { client } from '../../lib/prisma';
import quices from '../../lib/quices';
import { RequestCtx } from '../../types';
import { sendRestError } from '../../util';

const answerQuiz = async (req: RequestCtx, res: Response) => {
    const quizId = req.params.id;

    const quiz = await client.quiz.findFirst({
        where: {
            id: quizId,
        },
    });

    if (!quiz) {
        throw new Error('No quiz found');
    }

    const result = await quices
        .answerQuiz(quiz, req.body.answers)
        .catch((error) => {
            sendRestError(res, 404, {
                message: 'Something is wrong with the data you sent',
                verbose: 'data missing',
            });
        });

    if (!result) return;

    if (quiz.isDiagnostic) {
        const progress = { ...(req.ctx.user.progress as object) };

        progress[quiz.courseId] = (result as any).validated;

        await client.users.update({
            where: { id: req.ctx.user.id },
            data: {
                progress,
            },
        });
    }

    res.json({ result });
};

export default answerQuiz;
