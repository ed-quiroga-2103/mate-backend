import { client } from '../prisma';

const getCourse = async (id) => {
    const course = await client.course
        .findUnique({
            where: {
                id,
            },
            include: {
                graph: true,
                subjects: true,
            },
        })
        .catch((error) => {
            throw error;
        });

    const result: any = course;
    result.graph = course.graph[0];

    return result;
};

export default getCourse;
