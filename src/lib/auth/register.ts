import { User } from '../../types';
import UserModel from '../database/schemas/User';

const register = async (data: User) => {
    const exists = await UserModel.find({ email: data.email });

    if (exists.length > 0) {
        return undefined;
    }

    const newUser = new UserModel(data);
    await newUser.save().catch((error) => {
        console.log(error);
    });

    return newUser;
};

export default register;
