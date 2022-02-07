import UserModel from '../database/schemas/User';

const me = async (email) => {
    const user = await UserModel.find({ email }, { password: 0 });

    return user[0];
};

export default me;
