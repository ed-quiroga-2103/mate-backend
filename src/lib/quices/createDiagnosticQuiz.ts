import { DiagnosticQuizGenerationParams } from '../../types/quices';
import generateDiagnosticQuizQuestions from './questions/generateDiagnosticQuizQuestions';
import { client } from '../prisma';

const createDiagnosticQuiz = async (params: DiagnosticQuizGenerationParams) => {
    const questions = await generateDiagnosticQuizQuestions(params);

    const quiz = await client.quiz.create({
        data: {
            questions,
            courseId: params.courseId,
            tags: params.tags,
            isDiagnostic: true,
        },
    });

    return quiz;
};

export default createDiagnosticQuiz;
