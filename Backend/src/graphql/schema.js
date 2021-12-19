import { makeExecutableSchema } from 'graphql-tools';
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge')
const { loadFilesSync } = require('@graphql-tools/load-files')
import path from 'path';

const AllTypes = loadFilesSync(path.join(__dirname, "APIs/**/*.graphql"));
const AllResolvers = loadFilesSync(path.join(__dirname, "APIs/**/resolvers.js"));
const schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs(AllTypes, { all: true }),
  resolvers: mergeResolvers(AllResolvers)
});

export default schema;