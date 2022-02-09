import express from 'express';
import getAllQuestions from './getAllQuestions';
import getQuestion from './getQuestion';
import postQuestion from './postQuestion';
import upload from './postQuestionImage';
import updateQuestion from './updateQuestion';

const app = express();

app.post('/', postQuestion);
app.get('/', getAllQuestions);
app.get('/:id', getQuestion);
app.put('/:id', updateQuestion);
//Upload with multi part form
app.use(upload);

export default app;
