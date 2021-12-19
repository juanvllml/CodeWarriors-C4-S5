import Project from '../../../models/Project'

const Mutation = {
    createProject: async (_, { input }) => {
        const newProject = new Project(input);
        await newProject.save();
        return newProject;
        },

    async updateProject(_, { _id, input }) {
            return await Project.findByIdAndUpdate(_id, input, { new: true});
            },

    async deleteProject(_, { _id }){
            return await Project.findByIdAndDelete(_id);
        }
    }
export default Mutation;