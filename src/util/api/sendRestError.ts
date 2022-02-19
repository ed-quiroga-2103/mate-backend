import { VerboseErrors } from '../../types';

const sendRestError = (
    res,
    status,
    object: {
        message: string;
        verbose: VerboseErrors;
    }
) => {
    res.status(status);
    res.json(object);
    return;
};

export default sendRestError;
