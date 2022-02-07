export interface Question {
    course: string;
    difficulty: string;
    tags: string[];
    options: Option[];
}

export interface Option {
    isCorrect: boolean;
    value: string;
}
