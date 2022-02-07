import { Response, Request } from 'express';
import graphLib from '../../lib/graphs';

const createGraph = async (req: Request, res: Response) => {
    const graph = await graphLib.createGraph(req.body).catch((error) => {});

    if (!graph) {
        res.status(403);
        res.send({
            message: 'Ya existe un curso con los datos ingresados',
            verbose: 'duplicate user',
        });
        return;
    }

    res.status(200);
    res.send({ data: graph });
};

export default createGraph;
