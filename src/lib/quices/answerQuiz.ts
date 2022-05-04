import { questions } from '@prisma/client';
import { Question } from '../../types';
import { Quiz, QuizAnswer } from '../../types/quices';
import { client } from '../prisma';
import evaluateDiagnostic from './evaluateDiagnostic';
import validateQuiz from './validateQuiz';

const answerQuiz = async (quiz, answers: QuizAnswer[]) => {
    if (quiz.isDiagnostic) {
        const result = await evaluateDiagnostic(quiz, answers);
        return result;
    }

    const evaluation = evaluateQuiz(
        {
            questions: quiz.questions as object as questions[],
            tags: quiz.tags,
            courseId: quiz.courseId,
        },
        answers
    );

    const quizResult = await client.quizResult.create({
        data: {
            answers: evaluation.validated as object[],
            approved: evaluation.isAproved,
            percentage: evaluation.percentage,
            quiz: {
                connect: {
                    id: quiz.id,
                },
            },
        },
    });

    return quizResult;
};

const evaluateQuiz = (quiz: Quiz, answers: QuizAnswer[]) => {
    const validated = validateQuiz(
        {
            questions: quiz.questions as object as questions[],
            tags: quiz.tags,
            courseId: quiz.courseId,
        },
        answers
    );

    let isAproved = false;

    let total = quiz.questions.length;

    let correct = 0;

    for (const answer of validated) {
        if (answer.isCorrect) {
            correct += 1;
        }
    }

    const percentage = (correct / total) * 100;

    if (percentage > 67.5) {
        isAproved = true;
    }

    return { isAproved, percentage, validated };
};

export default answerQuiz;
