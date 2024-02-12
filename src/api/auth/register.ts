import { Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import authLib from '../../lib/auth';
import config from '../../lib/config/config';
import { client } from '../../lib/prisma';

const register = async (req: Request, res: Response) => {

    const { code } = req.body

    const search = await client.registrationCode.findFirst({
        where: {
            AND:{
                code: code,
                status: 'pending'
            }
        }
    }
    )

    if (!search || !code) {
        res.status(404);
        return res.send({ message: 'Invalid code' });
    }


    const user = await authLib.register(req.body).catch((error) => { });

    if (!user) {
        res.status(403);
        res.send({
            message: 'Ya existe un usuario relacionado con el correo ingresado',
            verbose: 'duplicate user',
        });
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

export default register;
