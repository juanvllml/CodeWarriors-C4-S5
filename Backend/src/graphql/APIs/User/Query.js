import User from '../../../models/User'

const Query = {

    allUsers: async () => {
        return await User.find();
    },

    usersByType: async (parents, args) => {
        const students = await User.find({ user_type: args.user_type })
            .populate('user_type')
        return students;
    },

    verifyUser: async (parents, args) => {
        const userFiltered = await User.find({ email: args.email, password: args.password })
            .populate('email')
            .populate('password')
        return userFiltered;
    }
}

export default Query;