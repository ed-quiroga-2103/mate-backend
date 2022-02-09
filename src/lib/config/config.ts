import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/../../../.env' });

const config = {
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    QUESTIONS_S3_KEY: process.env.QUESTIONS_S3_KEY,
    QUESTIONS_S3_ID: process.env.QUESTIONS_S3_ID,
    QUESTIONS_BUCKET_NAME: process.env.QUESTIONS_BUCKET_NAME,
    QUESTIONS_BUCKET_URL: process.env.QUESTIONS_BUCKET_URL,
};

export default config;
