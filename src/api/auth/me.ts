import { Response } from 'express';
import { RequestCtx } from '../../types';

const me = async (req: RequestCtx, res: Response) => {
    // Update after new database

    const user = req?.ctx.user;

    if (!user) {
        res.status(404);
        res.send({ message: 'No user found' });
        return;
    }

    res.status(200);
    res.send({ user });
};

export default me;
