import { questions } from '@prisma/client';
import { Option } from '../../types';
import { Quiz, QuizAnswer, QuizAnswerResultData } from '../../types/quices';

const validateQuiz = (
    quiz: Quiz,
    answers: QuizAnswer[]
): QuizAnswerResultData[] => {
    const result: QuizAnswerResultData[] = [];

    for (const question of quiz.questions) {
        const answer = getQuestionAnswer(question.id, answers);

        const quizAnswerResult: QuizAnswerResultData = {
            question,
            isCorrect: isAnswerCorrect(question, answer),
            value: answer ? answer.value : '-',
            answered: answer ? true : false,
            questionId: question.id,
        };

        result.push(quizAnswerResult);
    }

    return result;
};

const getQuestionAnswer = (questionId, answers: QuizAnswer[]) => {
    for (const answer of answers) {
        if (answer.questionId === questionId) {
            return answer;
        }
    }

    return undefined;
};

const isAnswerCorrect = (question: questions, answer: QuizAnswer) => {
    if (!answer) return false;

    for (const option of question.options) {
        const optionObject = option as object as Option;
        if (optionObject.value === answer.value) {
            return optionObject.isCorrect;
        }
    }

    return false;
};

export default validateQuiz;
