import { Request, Response } from 'express';
import courses from '../../lib/courses';
import { client } from '../../lib/prisma/client';
import validateQuestionFilters from '../../lib/questions/validateQuestionFilters';
import { CourseFilters, QuestionFilters } from '../../types';
import { sendRestError } from '../../util';
import users from '../../lib/users';

const getAllUsers = async (req: Request, res: Response) => {
    const pageNum = req.query.page ? parseInt(req.query.page as string, 10) : 1;
    const pageSize = req.query.size
        ? parseInt(req.query.size as string, 10)
        : 15;

    let filters: CourseFilters = {};

    const coursesList = await users.getAllusers();

    console.log(coursesList);

    res.json({ students: coursesList });
};

export default getAllUsers;
