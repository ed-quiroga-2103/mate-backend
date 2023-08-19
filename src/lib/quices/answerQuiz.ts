import { questions, users } from '@prisma/client';
import { Question } from '../../types';
import { Quiz, QuizAnswer } from '../../types/quices';
import { client } from '../prisma';
import evaluateDiagnostic from './evaluateDiagnostic';
import validateQuiz from './validateQuiz';

const answerQuiz = async (quiz, answers: QuizAnswer[], user: users) => {
    if (quiz.isDiagnostic) {
        const result = await evaluateDiagnostic(quiz, answers);

        const evalVector = {
            a: 0,
            b: 0,
            c: 0,
            d: 0,
        };

        for (const subject of result.subjects) {
            for (const question of subject.questions) {
                if (question.isCorrect) {
                    const questionVector = question.question.evalVector;
                    evalVector.a += questionVector['a'] || 0;
                    evalVector.b += questionVector['b'] || 0;
                    evalVector.c += questionVector['c'] || 0;
                    evalVector.d += questionVector['d'] || 0;
                } else {
                    const questionVector = question.question.evalVector;
                    evalVector.a -= questionVector['a'] || 0;
                    evalVector.b -= questionVector['b'] || 0;
                    evalVector.c -= questionVector['c'] || 0;
                    evalVector.d -= questionVector['d'] || 0;
                }
            }
        }

        const updatedVector = {
            a: evalVector.a + user.averageVector['a'] * user.evaluationQty || 0,
            b: evalVector.b + user.averageVector['b'] * user.evaluationQty || 0,
            c: evalVector.c + user.averageVector['c'] * user.evaluationQty || 0,
            d: evalVector.d + user.averageVector['d'] * user.evaluationQty || 0,
        };

        for (const key of Object.keys(updatedVector)) {
            updatedVector[key] = updatedVector[key] / (user.evaluationQty + 1);
        }

        await client.users.update({
            where: {
                id: user.id,
            },
            data: {
                averageVector: updatedVector,
            },
        });

        let percentage = 0;

        for (const subject of result.subjects) {
            percentage += subject.percentage;
        }

        percentage = percentage / result.subjects.length;

        return { percentage, validated: result, isApproved: percentage > 70 };
    }

    const evaluation = evaluateQuiz(
        {
            questions: quiz.questions as object as questions[],
            tags: quiz.tags,
            courseId: quiz.courseId,
        },
        answers
    );

    console.log('gere');

    const evalVector = {
        a: 0,
        b: 0,
        c: 0,
        d: 0,
    };

    for (const question of evaluation.validated) {
        if (question.isCorrect) {
            const questionVector = question.question.evalVector;
            console.log(question.question.evalVector);
            evalVector.a += questionVector['a'] || 0;
            evalVector.b += questionVector['b'] || 0;
            evalVector.c += questionVector['c'] || 0;
            evalVector.d += questionVector['d'] || 0;
        } else {
            const questionVector = question.question.evalVector;
            evalVector.a -= questionVector['a'] || 0;
            evalVector.b -= questionVector['b'] || 0;
            evalVector.c -= questionVector['c'] || 0;
            evalVector.d -= questionVector['d'] || 0;
        }
    }

    console.log('eval: ', evalVector);

    const updatedVector = {
        a: evalVector.a + user.averageVector['a'] * user.evaluationQty || 0,
        b: evalVector.b + user.averageVector['b'] * user.evaluationQty || 0,
        c: evalVector.c + user.averageVector['c'] * user.evaluationQty || 0,
        d: evalVector.d + user.averageVector['d'] * user.evaluationQty || 0,
    };

    console.log('before: ', updatedVector);

    for (const key of Object.keys(updatedVector)) {
        updatedVector[key] = updatedVector[key] / (user.evaluationQty + 1);
    }

    console.log('updated: ', updatedVector);

    await client.users.update({
        where: {
            id: user.id,
        },
        data: {
            averageVector: updatedVector,
        },
    });

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
        include: {
            quiz: {
                include: {
                    subject: { select: { name: true, id: true } },
                    course: {
                        select: {
                            id: true,
                            name: true,
                            code: true,
                        },
                    },
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
        console.log(answer);
        if (answer.isCorrect) {
            correct += 1;
        }
    }

    const percentage = (correct / total) * 100;

    if (percentage > 70) {
        isAproved = true;
    }

    return { isAproved, percentage, validated, questions: validated };
};

export default answerQuiz;
