import { QuizGenerationParams } from '../../types/quices';
import { client } from '../prisma';
import generateQuizQuestions from './generateQuizQuestions';

const createCourseQuiz = async (params: QuizGenerationParams) => {
    const questions = await generateQuizQuestions(params);

    const quiz = await client.quiz.create({
        data: {
            questions,
            courseId: params.courseId,
            tags: params.tags,
        },
    });

    return quiz;
};

export default createCourseQuiz;
