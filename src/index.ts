import express from 'express';
import { Response } from 'express';
import cors from 'cors';
import authApp from './api/auth';
import graphsApp from './api/graph';
import questionsApp from './api/questions/';

import { connect } from './lib/prisma/client';

const mainApp = express();

const port = process.env.PORT || 3003;

mainApp.get('/health', (req, res) => {
    res.json('Hello from express and typescript');
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
mainApp.use(cors());

mainApp.use('/graph', graphsApp);
mainApp.use('/auth', authApp);
mainApp.use('/questions', questionsApp);

mainApp.listen(port, async () => {
    await connect();
    console.log('-----------------------------');
    console.log(`App listening on PORT ${port}`);
    console.log(`Prisma connected to database`);
    console.log('-----------------------------');
});
