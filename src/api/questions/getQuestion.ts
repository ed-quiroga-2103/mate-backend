import { MongoClient, GridFSBucket as Grid, ObjectId } from 'mongodb';
import { Response, Request } from 'express';

import config from '../../lib/config/config';

let db;

MongoClient.connect(config.DATABASE_URI, (err, database) => {
    if (err) {
        console.log(
            'MongoDB Connection Error. Please make sure that MongoDB is running.'
        );
        process.exit(1);
    }
    db = database.db('mate');
});

const getQuestion = async (req: Request, res: Response) => {
    try {
        var photoID = new ObjectId(req.params.photoID);
    } catch (err) {
        return res.status(400).json({
            message:
                'Invalid PhotoID in URL parameter. Must be a single String of 12 bytes or a string of 24 hex characters',
        });
    }

    let bucket = new Grid(db, {
        bucketName: 'photos',
    });

    let downloadStream = bucket.openDownloadStream(photoID);

    downloadStream.on('data', (chunk) => {
        res.write(chunk);
    });

    downloadStream.on('error', () => {
        res.sendStatus(404);
    });

    downloadStream.on('end', () => {
        res.end();
    });
};

export default getQuestion;
