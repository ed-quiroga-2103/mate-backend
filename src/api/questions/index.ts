import express from 'express';
import postQuestion from './postQuestion';
import upload from './postQuestionImage';

const app = express();

app.post('/', postQuestion);

//Upload with multi part form
app.post('/upload', upload.array('upl', 1), function (req, res, next) {
    res.send('Uploaded!');
});

export default app;
