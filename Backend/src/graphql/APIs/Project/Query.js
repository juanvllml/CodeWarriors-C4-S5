import Project from '../../../models/Project'

const Query = {

    allProjects: async () => {
        return await Project.find();
    },
    projectById: (_, { _id }) => Project.findById(_id),
    projectByLeader: async (parents, args) => {
        const projectFiltered = await Project.find({ leader_cc: args.leader_cc })
            .populate('leader_cc')
        return projectFiltered;
    }
}

export default Query;