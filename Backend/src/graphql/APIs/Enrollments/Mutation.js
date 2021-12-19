import Enrollment from '../../../models/Enrollment'

const Mutation = {
    createEnrollment: async (_, { input }) => {
        const newEnrollment = new Enrollment(input);
        await newEnrollment.save();
        return newEnrollment;
    },
    async updateEnrollment(_, { _id, input }) {
            return await Enrollment.findByIdAndUpdate(_id, input, { new: true});
            },

    async deleteEnrollment(_, { _id }){
           return await Enrollment.findByIdAndDelete(_id);
        }
    }
export default Mutation;