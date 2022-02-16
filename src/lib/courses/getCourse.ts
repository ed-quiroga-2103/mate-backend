import { client } from '../prisma';

const getCourse = async (id) => {
    const course = await client.course.findUnique(id).catch((error) => {
        throw error;
    });

    return course;
};

export default getCourse;
