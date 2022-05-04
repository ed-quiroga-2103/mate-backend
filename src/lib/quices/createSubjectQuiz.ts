import { QuizGenerationParams } from '../../types/quices';
import { client } from '../prisma';
import generateSubjectQuizQuestions from './questions/generateSubjectQuizQuestions';

const createSubjectQuiz = async (params: QuizGenerationParams) => {
    const questions = await generateSubjectQuizQuestions(params);

    const quiz = await client.quiz.create({
        data: {
            questions,
            courseId: params.courseId,
            tags: params.tags,
            subjectId: params.subjectId,
        },
    });

    return quiz;
};

export default createSubjectQuiz;
