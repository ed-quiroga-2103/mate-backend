import isTokenValid from '../util/isTokenValid';
import jwt, { JwtPayload } from 'jsonwebtoken';
import authLib from '../lib/auth';
import config from '../lib/config/config';

const validateTokenMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        res.status(403).send({ message: 'Token not found in headers' });
        return;
    }
    if (!isTokenValid(token)) {
        res.status(403).send({ message: 'Token is not valid' });
        return;
    }

    const decoded = jwt.decode(token.split(' ')[1]) as any;

    const user = await authLib.me(decoded.email);

    req.ctx = {
        user,
    };

    next();
};

export default validateTokenMiddleware;
