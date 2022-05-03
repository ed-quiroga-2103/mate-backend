import { QuizGenerationParams } from '../../types/quices';
import { client } from '../prisma';
import createDiagnosticQuiz from './createDiagnosticQuiz';
import generateQuizQuestions from './questions/generateQuizQuestions';

const createCourseQuiz = async (params: QuizGenerationParams) => {
    const questions = await generateQuizQuestions(params);

    const quiz = await client.quiz.create({
        data: {
            questions,
            courseId: params.courseId,
            tags: params.tags,
            isDiagnostic: false,
        },
    });

    return quiz;
};

export default createCourseQuiz;
