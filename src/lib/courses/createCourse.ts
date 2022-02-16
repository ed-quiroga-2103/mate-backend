import { InputCourse } from '../../types';
import { client } from '../prisma';
import graphs from './graphs';
const createCourse = async (courseData: InputCourse) => {
    let graphData;

    try {
        graphData = graphs.buildGraph(courseData.graph);
    } catch (error) {
        throw {
            code: 'bad-graph',
        };
    }

    const course = await client.course
        .create({
            data: {
                name: courseData.name,
                code: courseData.code,
                description: courseData.description,
                dependecies: courseData.dependencies,
                status: 'active',
                graph: {
                    create: {
                        nodes: graphData.nodes as object,
                        links: graphData.links as object,
                    },
                },
            },
        })
        .catch((error) => {
            throw error;
        });

    return course;
};

export default createCourse;
