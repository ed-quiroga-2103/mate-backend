import { client } from '../../lib/prisma/client';
import { Response, Request } from 'express';

const postQuestion = async (req: Request, res: Response) => {
    const data = req.body;

    const question = await client.questions.create({
        data,
    });
};

export default postQuestion;
