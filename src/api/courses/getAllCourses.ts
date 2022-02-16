import { Request, Response } from 'express';
import courses from '../../lib/courses';
import { client } from '../../lib/prisma/client';
import validateQuestionFilters from '../../lib/questions/validateQuestionFilters';
import { CourseFilters, QuestionFilters } from '../../types';
import { sendRestError } from '../../util';

const getAllQuestions = async (req: Request, res: Response) => {
    const pageNum = req.query.page ? parseInt(req.query.page as string, 10) : 1;
    const pageSize = req.query.size
        ? parseInt(req.query.size as string, 10)
        : 15;

    let filters: CourseFilters = {};

    if (req.query.filter) {
        try {
            filters = courses.validateCourseFilters(
                req.query.filter,
                req.query.value
            );
        } catch (error) {
            sendRestError(res, 400, {
                message: error.message,
                verbose: 'wrong data',
            });
            return;
        }
    }

    const coursesList = await courses.listCourses(filters, pageNum, pageSize);

    res.json({ ...coursesList });
};

export default getAllQuestions;
