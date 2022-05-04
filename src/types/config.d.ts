import { users } from '@prisma/client';
import { Request } from 'express';

export interface RequestCtx extends Request {
    ctx?: {
        user: users;
    };
}
