import { Response, Request } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import authLib from '../../lib/auth';
import config from '../../lib/config/config';

const me = async (req: Request, res: Response) => {
    // Update after new database
    const token = req.headers.authorization;
    const decoded = jwt.decode(token.split(' ')[1]) as any;

    const user = await authLib.me(decoded.email);

    if (!user) {
        res.status(404);
        res.send({ message: 'No user found' });
        return;
    }

    res.status(200);
    res.send({ user });
};

export default me;
