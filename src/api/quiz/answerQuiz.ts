import { Request, Response } from 'express';
import quices from '../../lib/quices';
import { sendRestError } from '../../util';

const answerQuiz = async (req: Request, res: Response) => {
    const quizId = req.params.id;

    const result = await quices
        .answerQuiz(quizId, req.body.answers)
        .catch((error) => {
            sendRestError(res, 404, {
                message: 'Something is wrong with the data you sent',
                verbose: 'data missing',
            });
        });

    if (!result) return;

    res.json({ result });
};

export default answerQuiz;
