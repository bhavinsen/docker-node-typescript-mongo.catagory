import mongoose from "mongoose";

mongoose.connect("mongodb://mongo:27017/catagorysDB", {
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true
})