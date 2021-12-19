import { GraphQLServer } from 'graphql-yoga'
import schema from './graphql/schema'

export const server = new GraphQLServer({
    schema
})