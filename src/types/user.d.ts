export interface User {
    name: string;
    lastName: string;
    email: string;
    dni: string;
    lastCourse: string;
    admitionYear: int;
    progress: Progress[];
}

export interface Progress {
    id: string;
    completed: ProgressNode[];
}

export interface ProgressNode {
    name: string;
    id: int;
}
