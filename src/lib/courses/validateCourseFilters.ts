import { CourseFilters } from '../../types';

const validateCourseFilters = (filters, values): CourseFilters => {
    if (filters.length !== values.length) {
        throw new Error("Filters and Values don't match");
    }

    const formattedFilter: CourseFilters = {};

    for (let index = 0; index < filters.length; index++) {
        const filter = filters[index];

        let value;

        if (filter === 'dependencies') {
            try {
                value = JSON.parse(values[index]);
            } catch {
                throw new Error(
                    'The tags format or type is invalid. Admitted type: string[]'
                );
            }
        } else {
            value = values[index];
        }

        formattedFilter[filter] = value;
    }

    return formattedFilter;
};

export default validateCourseFilters;
