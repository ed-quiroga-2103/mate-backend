// getting-started.js
import mongoose from 'mongoose';
import config from '../config/config';

export async function main() {
    await mongoose.connect(config.DATABASE_URI).catch((error) => {
        throw error;
    });
    console.log(
        mongoose.connection.readyState
            ? 'Connected to Atlas database'
            : 'Connection Error'
    );
}
