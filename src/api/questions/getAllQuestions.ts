import { Request, Response } from 'express';
import { client } from '../../lib/prisma/client';
import validateQuestionFilters from '../../lib/questions/validateQuestionFilters';
import { QuestionFilters } from '../../types';
import { sendRestError } from '../../util';

const getAllQuestions = async (req: Request, res: Response) => {
    const pageNum = req.query.page ? parseInt(req.query.page as string, 10) : 1;
    const pageSize = req.query.size
        ? parseInt(req.query.size as string, 10)
        : 15;

    let filters: QuestionFilters = {};

    if (req.query.filter) {
        try {
            filters = validateQuestionFilters(
                req.query.filter,
                req.query.value
            );
        } catch (error) {
            sendRestError(res, 400, {
                message: error.message,
                verbose: 'wrong data',
            });
        }

        let courseId;

        if (filters.course) {
            const course = await client.course.findFirst({
                where: {
                    code: {
                        startsWith: filters.course,
                    },
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

        if (filters.tags) {
            const [count, questions] = await client
                .$transaction([
                    client.questions.count(),
                    client.questions.findMany({
                        take: pageSize,
                        skip: (pageNum - 1) * pageSize,
                        where: {
                            courseId,
                            tags: {
                                hasEvery: filters.tags,
                            },
                            difficulty: filters.difficulty,
                        },
                    }),
                ])
                .catch((error) => {
                    sendRestError(res, 500, {
                        message: 'Something went wrong querying your data',
                        verbose: 'internal error',
                    });

                    return [undefined, undefined];
                });

            if (!count && !questions) {
                return;
            }

            res.json({ questions, total: count, pageSize: questions.length });
        } else {
            const [count, questions] = await client
                .$transaction([
                    client.questions.count(),
                    client.questions.findMany({
                        take: pageSize,
                        skip: (pageNum - 1) * pageSize,
                        where: {
                            courseId,
                            difficulty: filters.difficulty,
                        },
                    }),
                ])
                .catch((error) => {
                    sendRestError(res, 500, {
                        message: 'Something went wrong querying your data',
                        verbose: 'internal error',
                    });

                    return [undefined, undefined];
                });

            if (!count && !questions) {
                return;
            }
            res.json({ questions, total: count, pageSize: questions.length });
            return;
        }
    }
    const [count, questions] = await client
        .$transaction([
            client.questions.count(),
            client.questions.findMany({
                take: pageSize,
                skip: (pageNum - 1) * pageSize,
            }),
        ])
        .catch((error) => {
            sendRestError(res, 500, {
                message: 'Something went wrong querying your data',
                verbose: 'internal error',
            });

            return [undefined, undefined];
        });

    if (!count && !questions) {
        return;
    }
    res.json({ questions, total: count, pageSize: questions.length });
};

export default getAllQuestions;
