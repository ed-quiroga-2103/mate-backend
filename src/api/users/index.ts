import express from 'express';
import getAllUsers from './getAllUsers';

const app = express();

app.get('/', getAllUsers);
// app.get('/:id', getQuestion);
// app.put('/:id', updateQuestion);
// //Upload with multi part form
// app.use(upload);

export default app;
