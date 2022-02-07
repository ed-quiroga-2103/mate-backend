import mongoose, { Schema } from 'mongoose';

const GraphSchema = new Schema({
    _id: String,
    name: String,
    description: String,
    status: String,
    nodes: [
        {
            id: Number,
            name: String,
            resources: [Object],
            dependencies: [{ id: Number, name: String }],
        },
    ],
    links: [
        {
            from: Number,
            to: Number,
        },
    ],
    resources: Object,
    dependencies: Object,
});

const GraphModel = mongoose.model('Graph', GraphSchema, 'graphs');

export default GraphModel;
