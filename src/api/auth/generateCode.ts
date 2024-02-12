import { Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import authLib from '../../lib/auth';
import config from '../../lib/config/config';

const generateCode = async (req: Request, res: Response) => {
   

    const {code, generatedBy} = req.body


    const response = await authLib.generateCode(generatedBy, code)
    console.log(response)

    
    res.status(200);
    res.send({ response });
};

export default generateCode;
