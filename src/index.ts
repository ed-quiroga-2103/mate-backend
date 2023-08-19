import express from 'express';
import { Response } from 'express';
import cors from 'cors';
import authApp from './api/auth';
import courseApp from './api/courses';
import questionsApp from './api/questions/';
import quicesApp from './api/quiz';
import usersApp from './api/users';
import { connect } from './lib/prisma/client';

const mainApp = express();

const port = process.env.PORT || 3003;

mainApp.use(
    cors({
        origin: '*',
    })
);

// mainApp.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
// });

mainApp.get('/health', (req, res) => {
    res.send(`
    <h1>──────▄▀▄─────▄▀▄</h1>
    <h1>─────▄█░░▀▀▀▀▀░░█▄</h1>
    <h1>─▄▄──█░░░░░░░░░░░█──▄▄</h1>
    <h1>█▄▄█─█░░▀░░┬░░▀░░█─█▄▄█</h1>
    <h1>Whatchu doing here?</h1>
    <h1>Server running healthy</h1>
`);
});

mainApp.get('/ping', (_, res) => {
    res.json({ when: new Date(), response: 'pong' });
});

mainApp.use(
    express.json({
        verify: (_, res: Response, buf, __) => {
            try {
                JSON.parse(buf.toString());
            } catch (e) {
                res.status(405).send('Invalid JSON');
                throw Error('Invalid JSON');
            }
        },
    })
);

mainApp.use('/courses', courseApp);
mainApp.use('/auth', authApp);
mainApp.use('/questions', questionsApp);
mainApp.use('/quices', quicesApp);
mainApp.use('/users', usersApp);

mainApp.listen(port, async () => {
    await connect();
    console.log('-----------------------------');
    console.log(`App listening on PORT ${port}`);
    console.log(`Prisma connected to database`);
    console.log('-----------------------------');
});
