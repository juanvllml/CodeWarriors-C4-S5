import { GraphQLServer } from 'graphql-yoga'
import schema from './graphql/schema'
import { validateToken } from './utils/tokenUtils';

const getUserData = (token) => {
    const verificacion = validateToken(token.split(' ')[1]);
    if (verificacion.data) {
        return verificacion.data;
    } else {
        return null;
    }
};

export const server = new GraphQLServer({
    schema,
    context: req => {
        const token = req.request.get('authorization');
        if (token) {
            const userData = getUserData(token);
            console.log('user data', userData);
            if (userData) {
                return { userData };
            }
        }
        return null;
    },
})