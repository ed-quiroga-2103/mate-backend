import { questions } from '@prisma/client';

export interface QuizGenerationParams {
    length: number;
    tags: string[];
    courseId: string;
}

export interface Quiz {
    questions: questions[];
    tags: string[];
    courseId: string;
}

export interface QuizAnswer {
    questionId: string;
    value: string;
}

export interface QuizAnswerResultData {
    questionId: string;
    value: string;
    isCorrect: boolean;
    answered: boolean;
}
