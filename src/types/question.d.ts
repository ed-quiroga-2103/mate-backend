export interface Question {
    text?: string;
    course: string;
    difficulty: string;
    tags: string[];
    options: Option[];
    subjectId: string;
    evalVector: {
        a: number;
        b: number;
        c: number;
        d: number;
    };
}

export interface Option {
    isCorrect: boolean;
    value: string;
}

export interface QuestionFilters {
    course?: string;
    difficulty?: string;
    tags?: string[];
}
