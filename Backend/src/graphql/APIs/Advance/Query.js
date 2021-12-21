import Advance from '../../../models/Advance'

const Query = {
    advances: async (parent, args) => {
        const allAdvances = await Advance.find().populate('project_id').populate('student_id');
        return allAdvances;
    },
    advancesById: (_, { _id }) => Advance.findById(_id),
    advancesByProject: async (parents, args) => {
        const advancesFiltered = await Advance.find({ project_id: args.project_id })
            .populate('project_id')
            .populate('student_id');
        return advancesFiltered;
    }
}

export default Query;