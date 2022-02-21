import { client } from '../prisma';

const getCourse = async (id) => {
    console.log(id);

    const course = await client.course
        .findUnique({
            where: {
                id,
            },
            include: {
                graph: true,
            },
        })
        .catch((error) => {
            throw error;
        });

    console.log(course);

    return course;
};

export default getCourse;
