import Advance from '../../../models/Advance'

const Mutation = {
    createAdvance: async (_, { input }) => {
        const newAdvance = new Advance(input);
        await newAdvance.save();
        return newAdvance;
    },
    async updateAdvance(_, { _id, input }) {
            return await Advance.findByIdAndUpdate(_id, input, { new: true});
            },

    async deleteAdvance(_, { _id }){
           return await Advance.findByIdAndDelete(_id);
        }
    }
export default Mutation;