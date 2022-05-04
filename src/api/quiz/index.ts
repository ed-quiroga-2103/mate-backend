import express from 'express';
import validateTokenMiddleware from '../validateTokenMiddleware';
import answerQuiz from './answerQuiz';
import generateQuiz from './generateQuiz';

const app = express();

app.post('/:id', validateTokenMiddleware, answerQuiz);
app.get('/', generateQuiz);
// app.get('/:id', getQuestion);
// app.put('/:id', updateQuestion);
// //Upload with multi part form
// app.use(upload);

export default app;
