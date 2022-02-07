import { Response, Request } from 'express';
import graphLib from '../../lib/graphs';

const getGraphs = async (req: Request, res: Response) => {
    let graph;
    if (!req.query.field && !req.query.value) {
        graph = await graphLib.getAllGraphs().catch((error) => {});
    } else if (!req.query.field || !req.query.value) {
        res.status(400).send({
            message:
                'Missing field or value. Eitiher define both values or none to get all the possible elements',
        });
        return;
    }

    graph = await graphLib.getAllGraphs(req.query).catch((error) => {});

    res.status(200);
    res.send({ data: graph });
};

export default getGraphs;
