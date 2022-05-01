export interface Question {
    text?: string;
    course: string;
    difficulty: string;
    tags: string[];
    options: Option[];
    subjectId: string;
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
