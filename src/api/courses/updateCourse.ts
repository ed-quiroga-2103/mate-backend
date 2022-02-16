import { Request, Response } from 'express';
import courses from '../../lib/courses';
import { EditCourse } from '../../types';
import errorHandler, { sendRestError } from '../../util';

const updateQuestion = async (req: Request, res: Response) => {
    const data: EditCourse = req.body;
    const id = req.params.id as string;

    const course = await courses.editCourse(id, data).catch((error) => {
        const formatted = errorHandler.handlePrismaError(error);

        if (formatted) {
            sendRestError(res, formatted.code, formatted.error);
            return undefined;
        }

        sendRestError(res, 500, {
            message: 'Something went wrong updating your data',
            verbose: 'internal error',
        });

        return undefined;
    });

    if (!course) return;

    res.json({ course });
};

export default updateQuestion;
