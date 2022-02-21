import { Request, Response } from 'express';
import courses from '../../lib/courses';
import errorHandler, { sendRestError } from '../../util';

const getQuestion = async (req: Request, res: Response) => {
    const course = await courses.getCourse(req.params.id).catch((error) => {
        const formatted = errorHandler.handlePrismaError(error);

        if (formatted) {
            sendRestError(res, formatted.code, formatted.error);
            return undefined;
        }
        sendRestError(res, 500, {
            message: 'Something went wrong querying your data',
            verbose: 'internal error',
        });

        return undefined;
    });

    if (!course) return;

    res.json({ course });
};

export default getQuestion;
