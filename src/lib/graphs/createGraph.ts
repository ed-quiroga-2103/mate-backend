import GraphModel from '../database/schemas/Graph';

const createGraph = async (data) => {
    const exists = await GraphModel.find({ _id: data._id });

    if (exists.length > 0) {
        return undefined;
    }

    const newUser = new GraphModel(data);
    await newUser.save().catch((error) => {
        console.log(error);
    });

    return newUser;
};

export default createGraph;
