import { EditCourse, InputGraphData } from '../../types';
import { client } from '../prisma';
import graphs from './graphs';

const editCourse = async (id, courseData: EditCourse) => {
    const course = await client.course
        .update({
            where: {
                id,
            },
            data: {
                name: courseData.name,
                description: courseData.description,
                dependecies: courseData.dependencies,
                status: courseData.status,
                code: courseData.code,
            },
        })
        .catch((error) => {
            throw error;
        });

    if (courseData.graph) {
        await editCourseGraph(course.graphsId, courseData.graph).catch(
            (error) => {
                throw error;
            }
        );
    }
};

const editCourseGraph = async (id, graphData: InputGraphData[]) => {
    const updatedGraph = graphs.buildGraph(graphData);

    const graph = await client.graphs
        .update({
            where: {
                id,
            },
            data: {
                nodes: updatedGraph.nodes as object,
                links: updatedGraph.links as object,
            },
        })
        .catch((error) => {
            throw error;
        });

    return graph;
};

export default editCourse;
