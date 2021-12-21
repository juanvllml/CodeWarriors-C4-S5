import Enrollment from '../../../models/Enrollment'

const Query = {

    // allEnrollments: async () => {
    //     return await Enrollment.find();
    // }
    enrollments: async (parent, args) => {
        const allEnrollments = await Enrollment.find().populate('project_id').populate('student_id');
        return allEnrollments;
    },
    enrollmentsByProject: async (parents, args) => {
        const enrollmentFiltered = await Enrollment.find({ project_id: args.project_id })
            .populate('project_id')
            .populate('student_id');
        return enrollmentFiltered;
    },
}

export default Query;