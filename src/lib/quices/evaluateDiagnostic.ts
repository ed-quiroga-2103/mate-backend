import { questions, quiz } from '@prisma/client';
import { QuizAnswer } from '../../types/quices';
import grades from '../grades';
import { client } from '../prisma';

const evaluateDiagnostic = async (quiz: quiz, quizAnswers: QuizAnswer[]) => {
    const sortedAnswers: {
        [key: string]: {
            questionId: string;
            answer: string;
            isCorrect: boolean;
        }[];
    } = sortBySubject(quiz, quizAnswers);

    const result: {
        subjects: {
            questions: { question: questions; isCorrect: boolean }[];
            isApproved: boolean;
            suggestAnother: boolean;
            isCompleted: boolean;
            percentage: number;
        }[];
    } = { subjects: [] };

    for (const [key, data] of Object.entries(sortedAnswers)) {
        const subject = await client.subject.findFirst({
            where: {
                id: key,
            },
        });

        let percentage = 0;

        const questions = [];

        //Data is the list of questions
        for (const answer of data) {
            const question: object = getQuestion(quiz, answer.questionId);

            if (answer.isCorrect) {
                percentage += 1;
            }

            questions.push({
                question,
                isCorrect: answer.isCorrect,
            });
        }
        percentage = (percentage / questions.length) * 100;

        result.subjects.push({
            ...subject,
            questions,
            percentage,
            isApproved: percentage >= 70,
            suggestAnother: percentage >= 70 && percentage < 85,
            isCompleted: percentage > 85,
        });
    }

    return result;
};

const sortBySubject = (quiz, quizAnswers: QuizAnswer[]) => {
    const sorted: {
        [key: string]: {
            questionId: string;
            answer: string;
            isCorrect: boolean;
        }[];
    } = getSubjects(quiz);

    for (const [key, data] of Object.entries(sorted)) {
        for (const [i, question] of data.entries()) {
            const answer = lookForAnswer(question.questionId, quizAnswers);

            sorted[key][i].answer = answer.value;
            sorted[key][i].isCorrect = isAnswerRight(
                quiz,
                question.questionId,
                answer
            );
        }
    }

    return sorted;
};

const lookForAnswer = (questionId, quizAnswers: QuizAnswer[]) => {
    for (const answer of quizAnswers) {
        if (answer.questionId === questionId) {
            return answer;
        }
    }

    return undefined;
};

const getSubjects = (quiz: quiz) => {
    const subjects = {};

    for (const rawQuestion of quiz.questions) {
        const question = rawQuestion as questions;

        if (subjects[question.subjectId]) {
            subjects[question.subjectId].push({ questionId: question.id });
            continue;
        }
        subjects[question.subjectId] = [{ questionId: question.id }];
    }

    return subjects;
};

const getQuestion = (quiz, questionId) => {
    for (const question of quiz.questions) {
        if (question.id === questionId) return question;
    }

    return undefined;
};

const isAnswerRight = (quiz: quiz, questionId, answer) => {
    for (const question of quiz.questions) {
        const formatted = question as questions;

        if (questionId === formatted.id) {
            for (const option of formatted.options) {
                if (answer.value === option['value']) {
                    return option['isCorrect'];
                }
            }

            return false;
        }
    }

    return false;
};

export default evaluateDiagnostic;
