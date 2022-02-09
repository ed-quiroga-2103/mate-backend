import multer from 'multer';
import multerS3 from 'multer-s3';
import config from '../../lib/config/config';
import { s3 } from '../../lib/s3';

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: config.QUESTIONS_BUCKET_NAME,
        key: function (req, file, cb) {
            console.log(file);
            cb(null, file.originalname); //use Date.now() for unique file keys
        },
    }),
});

export default upload;
