import User from '../../../models/User'
import bcrypt from 'bcrypt';
import { generateToken } from '../../../utils/tokenUtils';

const Mutation = {
    createUser: async (_, { input }) => {
        const salt = await bcrypt.genSalt(10);
        input.password = await bcrypt.hash(input.password, salt);
        const newUser = new User(input);
        await newUser.save();
        return newUser;
    },

    async updateUser(_, { _id, input }) {
        return await User.findByIdAndUpdate(_id, input, { new: true });
    },

    async deleteUser(_, { _id }) {
        return await User.findByIdAndDelete(_id);
    }
}
export default Mutation;