import express, { Request } from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import config from '../../lib/config/config';
import { client } from '../../lib/prisma/client';
import { validateQuestionImageDataMiddleware } from '../../lib/questions';
import { s3 } from '../../lib/s3';

const app = express();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: `${config.QUESTIONS_BUCKET_NAME}/public/questions`,
        key: function (req, file, cb) {
            const id = req.query.qid;
            const originalName = file.originalname.split('.');
            const extension = originalName[originalName.length - 1];

            req.filename = `${id}.${extension}`;

            cb(null, `${id}.${extension}`);
        },
    }),
});

app.post(
    '/upload',
    validateQuestionImageDataMiddleware,
    upload.array('upl', 1),
    (req, res, next) => {
        next();
    },
    async (req: Request & { filename: string }, res) => {
        await client.questions.update({
            where: {
                id: req.query.qid as string,
            },
            data: {
                url: `${config.QUESTIONS_BUCKET_URL}/${req.filename}`,
            },
        });

        res.json({ url: `${config.QUESTIONS_BUCKET_URL}/${req.filename}` });
    }
);

export default app;
