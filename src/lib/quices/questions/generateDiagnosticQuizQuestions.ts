import { DiagnosticQuizGenerationParams } from '../../../types/quices';

import { client } from '../../prisma';

const generateDiagnosticQuizQuestions = async (
    params: DiagnosticQuizGenerationParams
) => {
    let questions = [];

    const course = await client.course.findFirst({
        where: {
            id: params.courseId,
        },
        include: {
            subjects: true,
        },
    });

    for (const subject of course['subjects']) {
        const easy = await client.questions.findMany({
            where: {
                subjectId: subject.id,
                difficulty: 'easy',
            },
        });
        const intermediate = await client.questions.findMany({
            where: {
                subjectId: subject.id,
                difficulty: 'intermediate',
            },
        });
        const hard = await client.questions.findMany({
            where: {
                subjectId: subject.id,
                difficulty: 'hard',
            },
        });

        const randomEasy = getRandomQuestions(easy, params.easyQty);
        const randomInterm = getRandomQuestions(
            intermediate,
            params.intermedQty
        );
        const randomHard = getRandomQuestions(hard, params.intermedQty);

        questions = [
            ...questions,
            ...randomEasy,
            ...randomInterm,
            ...randomHard,
        ];
    }

    return questions;
};

const getRandomQuestions = (data, limit) => {
    const randomQuestions = [];
    let questions = data;

    let realLimit = limit;
    if (realLimit > questions.length) {
        realLimit = questions.length;
    }

    for (let i = 0; i < realLimit; i++) {
        const index = Math.floor(Math.random() * questions.length);

        const question = questions[index];

        questions = clearQuestion(questions, index);

        randomQuestions.push(question);
    }

    return randomQuestions;
};

const clearQuestion = (questions, index) => {
    const result = [];

    let ind = 0;
    for (const question of questions) {
        if (ind !== index) result.push(question);

        ind++;
    }

    return result;
};

export default generateDiagnosticQuizQuestions;
