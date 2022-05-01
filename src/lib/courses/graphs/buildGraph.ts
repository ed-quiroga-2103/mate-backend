import { subject } from '@prisma/client';
import { Graph, InputGraphData } from '../../../types';
import { client } from '../../prisma';

const buildGraph = async (graphData: InputGraphData[], courseId: string) => {
    const graph: Graph = { nodes: [], links: [] };

    const subjects = await createSubjects(graphData, courseId);

    for (const [index, subject] of graphData.entries()) {
        graph.nodes.push({ id: subject.name, subjectId: subjects[index].id });

        for (const link of subject.linkedTo) {
            graph.links.push({ source: subject.name, target: link });
        }
    }

    return graph;
};

const createSubjects = async (
    graphData: InputGraphData[],
    courseId: string
) => {
    const subjects = [];

    for (const subject of graphData) {
        const dbSub = await client.subject.create({
            data: {
                name: subject.name,
                resources: subject.resources,
                courseId: courseId,
            },
        });

        subjects.push(dbSub);
    }

    await setDependencies(graphData, subjects);

    return subjects;
};

const setDependencies = async (
    graphData: InputGraphData[],
    subjects: subject[]
) => {
    for (const subject of subjects) {
        const dependecyIds = getDependencies(subject.name, graphData, subjects);

        await client.subject.update({
            where: {
                id: subject.id,
            },
            data: {
                dependencies: dependecyIds,
            },
        });
    }
};

const getDependencies = (
    subjectName: string,
    graphData: InputGraphData[],
    subjects: subject[]
) => {
    let dependecies = [];

    for (const subject of graphData) {
        if (subject.linkedTo.includes(subjectName)) {
            dependecies.push(subject.name);
        }
    }

    const dependecyIds = [];

    for (const subject of subjects) {
        if (dependecies.includes(subject.name)) {
            dependecyIds.push(subject.id);
        }
    }

    return dependecyIds;
};

export default buildGraph;
