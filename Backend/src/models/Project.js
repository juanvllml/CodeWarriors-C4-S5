import { Schema, model } from "mongoose";

const projectSchema = new Schema({
    project_id:{
        type: String,
        required: true,
        unique: true,
    },
    project_name:{
        type: String,
        required: true,
        unique: true,
    },
    general_objectives: {
        type: String,
        required: true
    },
    specific_objectives: {
        type: String,
        required: false
    },
    budget: {
        type: Number,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: false
    },
    leader_name: {
        type: String,
        required: true
    },
    leader_cc: {
        type: String,
        required: true
    },
    project_status: {
        type: String,
        enum: ['ACTIVO', 'INACTIVO'],
        default: 'INACTIVO',
        required: true
    },
    project_stage: {
        type: String,
        enum: ['INICIADO', 'DESARROLLO', 'TERMINADO', 'NULO'],
        default: 'NULO'
    }
});

export default model("Project", projectSchema)