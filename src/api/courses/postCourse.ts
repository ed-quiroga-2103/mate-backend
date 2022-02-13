import { Request, Response } from 'express';
import courses from '../../lib/courses';
import { client } from '../../lib/prisma';
import { InputCourse } from '../../types';
import { sendRestError } from '../../util';

const postQuestion = async (req: Request, res: Response) => {
    const data: InputCourse = req.body;

    const exists = await client.course.findFirst({
        where: {
            code: data.code,
        },
    });

    if (exists) {
        sendRestError(res, 400, {
            message: 'Another course already exists with this code',
            verbose: 'duplicate entity',
        });
        return;
    }

    const course = await courses.createCourse(data).catch((error) => {
        if (error.code === 'bad-graph') {
            sendRestError(res, 400, {
                message: 'Something is wrong with the graph data.',
                verbose: 'wrong data',
            });
            return undefined;
        }
        sendRestError(res, 500, {
            message: 'Something went wrong posting your data.',
            verbose: 'internal error',
        });

        return undefined;
    });

    if (!course) {
        return;
    }

    res.json({ course });
};

export default postQuestion;
