import AWS from 'aws-sdk';
import config from '../config/config';

const credentials = new AWS.Credentials({
    accessKeyId: config.QUESTIONS_S3_ID,
    secretAccessKey: config.QUESTIONS_S3_KEY,
});

const s3 = new AWS.S3({
    credentials,
});

export { s3 };
