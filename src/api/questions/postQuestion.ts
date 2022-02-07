import { Response, Request } from 'express';
import multer from 'multer';
import config from '../../lib/config/config';
import bodyParser from 'body-parser';
import fs from 'fs';
import { s3 } from '../../lib/s3';
import multerS3 from 'multer-s3';

const uploadS3 = (req: Request, res: Response) => {
    const file = fs.readFileSync('');
    const params = {
        Bucket: config.QUESTIONS_BUCKET_NAME,
        Key: 'test.jpg',
        Body: file,
    };

    s3.upload(params, (error, __) => {
        if (error) {
            console.log('[S3 ERROR]: ', error);
        } else {
            console.log('File uploaded successfully');
        }
    });
};

import express from 'express';

const app = express();
app.use(bodyParser.json());

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: config.QUESTIONS_BUCKET_NAME,
        key: function (req, file, cb) {
            console.log(file);
            cb(null, file.originalname); //use Date.now() for unique file keys
        },
    }),
});

//open in browser to see upload form
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

//use by upload form
app.post('/upload', upload.array('upl', 1), function (req, res, next) {
    res.send('Uploaded!');
});

export default app;
