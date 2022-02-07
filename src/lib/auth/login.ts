import UserModel from '../database/schemas/User';

const login = async (email, password) => {
    const user = await UserModel.find({ email, password }, { password: 0 });

    return user[0];
};

export default login;
