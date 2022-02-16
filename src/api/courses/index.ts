import express from 'express';
import getAllCourses from './getAllCourses';
import getCourse from './getCourse';
import postCourse from './postCourse';
import updateCourse from './updateCourse';

const app = express();

app.post('/', postCourse);
app.get('/', getAllCourses);
app.get('/:id', getCourse);
app.put('/:id', updateCourse);

// //Upload with multi part form
// Maybe upload course image
// app.use(upload);

export default app;
