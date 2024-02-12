import { QuizGenerationParams } from '../../../types/quices';
import { client } from '../../prisma';

const generateSubjectQuizQuestions = async (params: QuizGenerationParams) => {
    const scriptQuestions:any = await client.questions.findMany({
        select: {
            id: true,
        },
    });

    for (const question of scriptQuestions) {
        let a = 0;
        let b = 0;
        let c = 0;
        let d = 0;

        while (a == 0 || b == 0 || c == 0 || d == 0) {
            a = Math.random();
            b = Math.random();
            c = Math.random();
            d = Math.random();
        }

        const updated = await client.questions.update({
            where: {
                id: question.id,
            },
            data: {
                evalVector: {
                    a,
                    b,
                    c,
                    d,
                },
            },
        });
    }

    const randomQuestions = [];

    let questions;

    if (params.tags && params.tags.length > 0) {
        questions = await client.questions.findMany({
            where: {
                tags: {
                    hasEvery: params.tags,
                },
                courseId: params.courseId,
                subjectId: params.subjectId,
            },
        });
    } else {
        questions = await client.questions.findMany({
            where: {
                courseId: params.courseId,
                subjectId: params.subjectId,
            },
        });
    }

    console.log(questions);

    for (let i = 0; i < params.length; i++) {
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

export default generateSubjectQuizQuestions;
