import { client } from '../prisma/client';
const generateCode = async (generatedBy, code) => {
    const data = {
        generatedBy,
        code
    }

    const response = await client.registrationCode.create({data})

    return response;
};

export default generateCode;
