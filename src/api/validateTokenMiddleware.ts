import isTokenValid from '../util/isTokenValid';

const validateTokenMiddleware = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        res.status(403).send({ message: 'Token not found in headers' });
        return;
    }
    if (!isTokenValid(token)) {
        res.status(403).send({ message: 'Token is not valid' });
        return;
    }
    next();
};

export default validateTokenMiddleware;
