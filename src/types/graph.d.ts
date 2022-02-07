export interface Graph {
    id: string;
    name: string;
    description: string;
    status: string;
    nodes: GraphNode[];
    links: GraphLink[];
    resources?: Resources;
    dependencies?: Dependency[];
}

export interface GraphNode {
    id: int;
    name: string;
    resources?: Resources;
    dependencies?: Dependency[];
}

export interface Resources {
    url: string;
}

export interface GraphLinks {
    sid: int;
    tid: int;
}

export interface Dependency {
    id: int;
    name: string;
}
