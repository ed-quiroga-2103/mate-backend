// ------- Legacy code Begin -------

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

export interface GraphFilters {
    name?: string;
    status?: string;
}

// ------- Legacy code end -------
export interface InputGraphData {
    name: string;
    linkedTo: string[];
}

export interface Graph {
    nodes: GraphNode[];
    links: GraphLink[];
}

export interface GraphNode {
    id: string;
    color?: string;
    size?: number;
    symbolType?:
        | 'circle'
        | 'cross'
        | 'diamond'
        | 'square'
        | 'star'
        | 'triangle'
        | 'wye';
}

export interface GraphLink {
    source: string;
    target: string;
}
