import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { sendRestError } from '../../util';
import { client } from '../prisma/client';

const validateQuestionImageDataMiddleware = async (
    req: Request,
    res: Response,
    next
) => {
    const qid = req.query.qid;

    if (!qid) {
        sendRestError(res, 400, {
            message: 'No question id sent in URL query',
            verbose: 'data missing',
        });
        return;
    }

    let formatError = false;
    const question = await client.questions
        .findUnique({
            where: {
                id: qid as string,
            },
        })
        .catch((error) => {
            if (error.code === 'P2023') {
                sendRestError(res, 400, {
                    message: 'Format error on the provided ObjectId',
                    verbose: 'wrong data',
                });
            }

            formatError = true;

            return;
        });

    if (formatError) return;

    if (!question) {
        sendRestError(res, 400, {
            message: 'No question found with provided id',
            verbose: 'wrong data',
        });
        return;
    }

    next();
};

export default validateQuestionImageDataMiddleware;
