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

    login: async (_, { email, password }) => {
        const user = await User.findOne({ email: email });
        if (user) {
            if (user.status == 'AUTORIZADO') {
                if (await bcrypt.compare(password, user.password)) {
                    return {
                        token: generateToken({
                            _id: user._id,
                            full_name: user.full_name,
                            cc: user.cc,
                            email: user.email,
                            user_type: user.user_type,
                            status: user.status
                        }),
                    };
                } else {
                    return {
                        error: 'Contraseña invalida'
                    }
                }
            } else {
                return {
                    error: 'Usuario Inactivo'
                }
            }
        }
        return {
            error: 'Usuario no encontrado'
        }
    },

    refreshToken: async (_, args, context, info)  => {
        //console.log('contexto', _, args, context, info);
        if (!context.userData) {
            return {
                error: 'token no valido',
            };
        } else {
            return {
                token: generateToken({
                    _id: context.userData._id,
                    full_name: context.userData.full_name,
                    cc: context.userData.cc,
                    email: context.userData.email,
                    user_type: context.userData.user_type,
                    status: context.userData.status
                }),
            };
        }
        // valdiar que el contexto tenga info del usuario. si si, refrescar el token
        // si no devolver null para que en el front redirija al login.
    },

    async updateUser(_, { _id, input }) {
        return await User.findByIdAndUpdate(_id, input, { new: true });
    },

    async deleteUser(_, { _id }) {
        return await User.findByIdAndDelete(_id);
    }
}
export default Mutation;