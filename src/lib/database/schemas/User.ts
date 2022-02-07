import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
    name: String,
    lastName: String,
    email: String,
    password: String,
    dni: String,
    lastCourse: String,
    admitionYear: String,
    progress: [
        {
            id: String,
            completed: [Number],
        },
    ],
});

const UserModel = mongoose.model('User', UserSchema, 'users');

export default UserModel;
