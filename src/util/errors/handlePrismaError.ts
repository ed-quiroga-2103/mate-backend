import { VerboseErrors } from '../../types';

const handlePrismaError = (
    error
): {
    error: {
        message: string;
        verbose: VerboseErrors;
    };
    code: number;
} => {
    switch (error.code) {
        case 'P2025':
            return {
                error: {
                    message: 'No record found with provided data',
                    verbose: 'data missing',
                },
                code: 404,
            };

        default:
            return undefined;
    }
};

export default handlePrismaError;
