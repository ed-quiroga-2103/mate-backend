import { MongoClient, GridFSBucket as Grid, ObjectId } from 'mongodb';
import express from 'express';
import { Readable } from 'stream';
import config from '../config/config';
import multer from 'multer';

var storage = multer.memoryStorage();
var upload = multer({
    storage: storage,
    limits: { fields: 1, fileSize: 6000000, files: 1, parts: 2 },
});

let db;

const photoRoute = express.Router();
const app = express();
app.use('/photos', photoRoute);

/**
 * Connect Mongo Driver to MongoDB.
 */
MongoClient.connect(config.DATABASE_URI, (err, database) => {
    if (err) {
        console.log(
            'MongoDB Connection Error. Please make sure that MongoDB is running.'
        );
        process.exit(1);
    }
    db = database.db('mate');
});

/**
 * GET photo by ID Route
 */
photoRoute.get('/:photoID', (req, res) => {
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
});

/**
 * POST photo Route
 */
photoRoute.post('/', (req, res) => {
    upload.single('photo')(req, res, (err) => {
        if (err) {
            return res
                .status(400)
                .json({ message: 'Upload Request Validation Failed' });
        } else if (!req.body.name) {
            return res
                .status(400)
                .json({ message: 'No photo name in request body' });
        }

        let photoName = req.body.name;

        // Covert buffer to Readable Stream
        const readablePhotoStream = new Readable();
        readablePhotoStream.push(req['file'].buffer);
        readablePhotoStream.push(null);

        let bucket = new Grid(db, {
            bucketName: 'photos',
        });

        let uploadStream = bucket.openUploadStream(photoName);
        let id = uploadStream.id;
        readablePhotoStream.pipe(uploadStream);

        uploadStream.on('error', () => {
            return res.status(500).json({ message: 'Error uploading file' });
        });

        uploadStream.on('finish', () => {
            return res.status(201).json({
                message:
                    'File uploaded successfully, stored under Mongo ObjectID: ' +
                    id,
            });
        });
    });
});

export default app;
