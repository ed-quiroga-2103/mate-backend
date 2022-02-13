import { client } from '../prisma';

const deleteCourse = async (id: string) => {
    // also deletes graph

    await client.course
        .delete({
            where: {
                id,
            },
        })
        .catch((error) => {
            throw error;
        });
};

export default deleteCourse;
