import jwt from 'jsonwebtoken';

const isTokenValid = (token) => {
    const decoded = jwt.decode(token.split(' ')[1]) as any;
    var dateNow = new Date();

    const secs = decoded.exp;
    const expDate = new Date(1970, 0, 1);
    expDate.setSeconds(secs);

    if (expDate.getTime() < dateNow.getTime()) {
        return false;
    } else {
        return true;
    }
};

export default isTokenValid;
