import { CourseFilters } from '../../types';
import { client } from '../prisma';

const listCourses = async (filters: CourseFilters, pageSize, pageNum) => {
    if (Object.entries(filters).length === 0) {
        const [count, courses] = await client
            .$transaction([client.course.count(), client.course.findMany()])
            .catch((error) => {
                throw error;
            });

        if (!count && !courses) {
            return undefined;
        }

        return { courses, total: count, pageSize: courses.length };
    }

    if (filters.dependencies) {
        const [count, courses] = await client
            .$transaction([
                client.course.count({
                    where: {
                        dependecies: {
                            hasEvery: filters.dependencies,
                        },
                        name: filters.name
                            ? {
                                  contains: filters.name,
                              }
                            : undefined,
                        status: filters.status,
                        code: filters.code
                            ? {
                                  contains: filters.code,
                              }
                            : undefined,
                    },
                }),
                client.course.findMany({
                    where: {
                        dependecies: {
                            hasEvery: filters.dependencies,
                        },
                        name: filters.name
                            ? {
                                  contains: filters.name,
                              }
                            : undefined,
                        status: filters.status,
                        code: filters.code
                            ? {
                                  contains: filters.code,
                              }
                            : undefined,
                    },
                }),
            ])
            .catch((error) => {
                throw error;
            });

        if (!count && !courses) {
            return undefined;
        }

        return { courses, total: count, pageSize: courses.length };
    }

    const [count, courses] = await client
        .$transaction([
            client.course.count({
                where: {
                    name: filters.name
                        ? {
                              contains: filters.name,
                          }
                        : undefined,
                    status: filters.status,
                    code: filters.code
                        ? {
                              contains: filters.code,
                          }
                        : undefined,
                },
            }),
            client.course.findMany({
                where: {
                    name: filters.name
                        ? {
                              contains: filters.name,
                          }
                        : undefined,
                    status: filters.status,
                    code: filters.code
                        ? {
                              contains: filters.code,
                          }
                        : undefined,
                },
            }),
        ])
        .catch((error) => {
            throw error;
        });

    if (!count && !courses) {
        return undefined;
    }

    return { courses, total: count, pageSize: courses.length };
};

export default listCourses;
