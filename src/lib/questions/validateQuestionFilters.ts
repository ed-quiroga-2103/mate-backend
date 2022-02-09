import { QuestionFilters } from '../../types';

const validateQuestionFilters = (filters, values): QuestionFilters => {
    if (filters.length !== values.length) {
        throw new Error("Filters and Values don't match");
    }

    const formattedFilter: QuestionFilters = {};

    for (let index = 0; index < filters.length; index++) {
        const filter = filters[index];

        let value;

        if (filter === 'tags') {
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

export default validateQuestionFilters;
