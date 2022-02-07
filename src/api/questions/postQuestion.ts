import { MongoClient, GridFSBucket as Grid, ObjectId } from 'mongodb';
import { Response, Request } from 'express';
import multer from 'multer';

var storage = multer.memoryStorage();
var upload = multer({
    storage: storage,
    limits: { fields: 1, fileSize: 6000000, files: 1, parts: 2 },
});

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

const postQuestion = async (req: Request, res: Response)  => {
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

export default postQuestion;
