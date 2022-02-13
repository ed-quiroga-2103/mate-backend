import { Graph, InputGraphData } from '.';

export interface InputCourse {
    name: string;
    description: string;
    code: string;
    dependencies: string[];
    graph: InputGraphData[];
}

export interface EditCourse {
    name?: string;
    description?: string;
    status?: string;
    code?: string;
    dependencies?: string[];
    graph?: InputGraphData[];
}

export interface Course {
    name: string;
    description: string;
    status: string;
    code: string;
    dependencies: string[];
    graph: Graph;
}

export interface CourseFilters {
    name?: string;
    dependencies?: string[];
    code?: string;
    status?: string;
}
