import { Graph, InputGraphData } from '../../../types';

const buildGraph = (graphData: InputGraphData[]) => {
    const graph: Graph = { nodes: [], links: [] };

    for (const subject of graphData) {
        graph.nodes.push({ id: subject.name });

        for (const link of subject.linkedTo) {
            graph.links.push({ source: subject.name, target: link });
        }
    }

    return graph;
};

export default buildGraph;
