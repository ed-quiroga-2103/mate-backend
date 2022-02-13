import express from 'express';
import generateQuiz from './generateQuiz';

const app = express();

// app.post('/', postQuestion);
app.get('/', generateQuiz);
// app.get('/:id', getQuestion);
// app.put('/:id', updateQuestion);
// //Upload with multi part form
// app.use(upload);

export default app;
