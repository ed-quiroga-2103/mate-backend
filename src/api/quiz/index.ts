import express from 'express';
import answerQuiz from './answerQuiz';
import generateQuiz from './generateQuiz';

const app = express();

app.post('/:id', answerQuiz);
app.get('/', generateQuiz);
// app.get('/:id', getQuestion);
// app.put('/:id', updateQuestion);
// //Upload with multi part form
// app.use(upload);

export default app;
