import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/../../../.env' });

const config = {
    DATABASE_URI: process.env.DATABASE_URI,
    JWT_SECRET: process.env.JWT_SECRET,
};

export default config;
