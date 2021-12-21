import { Schema, model } from "mongoose";
// import { ProjectModel } from './Project';
import { UserModel } from './User';

const enrollmentSchema = new Schema({
    enrollment_id:{
        type: String,
        required: false
    },
    project_id: {
        // type: Schema.Types.ObjectId,
        // ref: ProjectModel,
        type: String,
        required: true
    },
    student_id: {
        // type: Schema.Types.ObjectId,
        // ref: UserModel,
        type: String,
        required: true
    },
    enrollment_status: {
        type: String,
        enum: ['ACEPTADA', 'RECHAZADA', 'PENDIENTE'],
        required: true
    },
    admission_date: {
        type: Date,
        required: false
    },
    egress_date: {
        type: Date,
        required: false
    }
});

export default model("Enrollment", enrollmentSchema)