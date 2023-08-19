import { QuizGenerationParams } from '../../types/quices';
import { client } from '../prisma';
import generateSubjectQuizQuestions from './questions/generateSubjectQuizQuestions';

const createSubjectQuiz = async (params: QuizGenerationParams) => {
    const questions = await generateSubjectQuizQuestions(params);

    console.log(questions);

    console.log(params.courseId);

    const quiz = await client.quiz.create({
        data: {
            questions,
            courseId: params.courseId,
            tags: params.tags,
            subjectId: params.subjectId,
        },
    });

    console.log(quiz.questions);

    return quiz;
};

export default createSubjectQuiz;
