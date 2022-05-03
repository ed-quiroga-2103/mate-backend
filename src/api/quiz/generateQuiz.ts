import { Request, Response } from 'express';
import { client } from '../../lib/prisma/client';
import quices from '../../lib/quices';
import { Question } from '../../types';
import {
    DiagnosticQuizGenerationParams,
    QuizGenerationParams,
} from '../../types/quices';
import { sendRestError } from '../../util';

const generateQuiz = async (req: Request, res: Response) => {
    let quiz;

    if (req.query.type === 'D') {
        const params: DiagnosticQuizGenerationParams = {
            easyQty: parseInt(req.query.easyQty as string, 10),
            intermedQty: parseInt(req.query.intermedQty as string, 10),
            advancedQty: parseInt(req.query.advancedQty as string, 10),
            courseId: req.query.courseId as string,
            tags: req.query.tags ? JSON.parse(req.query.tags as string) : [],
        };

        quiz = await quices.createDiagnosticQuiz(params);
    } else {
        const params: QuizGenerationParams = {
            courseId: req.query.courseId as string,
            subjectId: req.query.subjectId as string,
            length: parseInt(req.query.length as string, 10),
            tags: req.query.tags ? JSON.parse(req.query.tags as string) : [],
            isDiagnostic: req.query.type === 'D',
        };

        if (params.subjectId) {
            quiz = await quices.createSubjectQuiz(params);
        } else {
            quiz = await quices.createCourseQuiz(params);
        }
    }

    if (!quiz) return;

    res.json({ quiz });
};

export default generateQuiz;
