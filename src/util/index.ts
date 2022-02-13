import sendRestError from './api/sendRestError';
import handlePrismaError from './errors/handlePrismaError';
import isTokenValid from './isTokenValid';

const errorHandler = {
    handlePrismaError,
};

export default errorHandler;

export { isTokenValid, sendRestError };
