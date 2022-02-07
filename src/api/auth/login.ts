import { Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import authLib from '../../lib/auth';
import config from '../../lib/config/config';

const login = async (req: Request, res: Response) => {
    // Update after new database
    const user = await authLib.login(req.body.email, req.body.password);

    if (!user) {
        res.status(404);
        res.send({ message: 'No user found' });
        return;
    }

    const token = jwt.sign({ email: user.email }, config.JWT_SECRET, {
        expiresIn: '12h',
    });

    const refreshToken = jwt.sign({ email: user.email }, config.JWT_SECRET, {
        expiresIn: '96h',
    });

    res.status(200);
    res.send({ token, refreshToken });
};

export default login;
