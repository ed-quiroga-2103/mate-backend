import { InputCourse } from '../../types';
import { client } from '../prisma';
import graphs from './graphs';
const createCourse = async (courseData: InputCourse) => {
    let graphData;

    const course = await client.course
        .create({
            data: {
                name: courseData.name,
                code: courseData.code,
                description: courseData.description,
                dependecies: courseData.dependencies,
                status: 'active',
            },
        })
        .catch((error) => {
            throw error;
        });

    try {
        graphData = await graphs.buildGraph(courseData.graph, course.id);
    } catch (error) {
        throw {
            code: 'bad-graph',
        };
    }

    const graph = await client.graphs
        .create({
            data: {
                nodes: graphData.nodes,
                links: graphData.links,
                courseId: course.id,
            },
        })
        .catch((error) => {
            throw error;
        });

    return course;
};

export default createCourse;
