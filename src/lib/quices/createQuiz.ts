import { QuizGenerationParams } from '../../types/quices';
import { client } from '../prisma';
import generateQuizQuestions from './generateQuizQuestions';

const createQuiz = async (params: QuizGenerationParams) => {
    console.log(params);

    const questions = await generateQuizQuestions(params);

    console.log(questions);

    const quiz = await client.quiz.create({
        data: {
            questions,
            courseId: params.courseId,
            tags: params.tags,
        },
    });

    return quiz;
};

export default createQuiz;
