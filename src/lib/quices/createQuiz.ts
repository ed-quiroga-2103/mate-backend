import { QuizGenerationParams } from '../../types/quices';
import { client } from '../prisma';
import generateQuizQuestions from './questions/generateQuizQuestions';

const createQuiz = async (params: QuizGenerationParams) => {
    const questions = await generateQuizQuestions(params);
    const evalVector = { a: 0, b: 0, c: 0, d: 0 };

    for (const question of questions) {
        evalVector.a += question.evalVector.a;
        evalVector.b += question.evalVector.b;
        evalVector.c += question.evalVector.c;
        evalVector.d += question.evalVector.d;
    }

    evalVector.a = evalVector.a / questions.length;
    evalVector.b = evalVector.b / questions.length;
    evalVector.c = evalVector.c / questions.length;
    evalVector.d = evalVector.d / questions.length;

    const quiz = await client.quiz.create({
        data: {
            questions,
            evalVector,
            courseId: params.courseId,
            tags: params.tags,
        },
    });

    return quiz;
};

export default createQuiz;
