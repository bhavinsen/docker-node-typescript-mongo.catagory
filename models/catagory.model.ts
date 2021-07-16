import { model, Schema } from "mongoose";

const catagorySchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    children: {
        type: [],
        ref: 'catagory',
        default: []
    },
    root: {
        type: Boolean,
        require: true,
    },
    price: {
        type: Number
    }
});

export default model("catagory", catagorySchema);