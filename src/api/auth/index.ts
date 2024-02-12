import express from 'express';
import validateTokenMiddleware from '../validateTokenMiddleware';
import login from './login';
import me from './me';
import register from './register';
import generateCode from './generateCode';

const authApp = express();

authApp.post('/login', login);
authApp.post('/register', register);
authApp.get('/me', validateTokenMiddleware, me);
authApp.post('/registerCode', validateTokenMiddleware, generateCode);


export default authApp;
