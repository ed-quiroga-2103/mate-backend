import express from 'express';
import { Response } from 'express';
import cors from 'cors';
import authApp from './api/auth';
import graphsApp from './api/graph';
import auth from './lib/auth';
import { main as connectDb } from './lib/database/index';

const mainApp = express();

const port = process.env.PORT || 3003;

mainApp.get('/', (req, res) => {
    res.send('Hello from express and typescript');
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

mainApp.listen(port, () => {
    connectDb();
    console.log(`App listening on PORT ${port}`);
});
