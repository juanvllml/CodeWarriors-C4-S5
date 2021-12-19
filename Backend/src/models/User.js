import { Schema, model } from "mongoose";

const userSchema = new Schema({
    full_name:{
        type: String,
        required: true
    },
    cc: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    user_type: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

export default model("User", userSchema)