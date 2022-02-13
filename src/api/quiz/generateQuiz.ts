import { Request, Response } from 'express';
import { client } from '../../lib/prisma/client';
import quices from '../../lib/quices';
import { Question } from '../../types';
import { QuizGenerationParams } from '../../types/quices';
import { sendRestError } from '../../util';

const generateQuiz = async (req: Request, res: Response) => {
    const params: QuizGenerationParams = {
        courseId: req.query.courseId as string,
        length: parseInt(req.query.length as string, 10),
        tags: req.query.tags ? JSON.parse(req.query.tags as string) : [],
    };

    const quiz = await quices.createQuiz(params);

    if (!quiz) return;

    res.json({ quiz });
};

export default generateQuiz;
