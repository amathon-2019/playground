import { buildSchema } from 'type-graphql';
import { UserResolver } from '../resolvers/user.resolver';

export const createSchema = async () =>
  await buildSchema({
    resolvers: [UserResolver],
    emitSchemaFile: {
      path: __dirname + '/schema.gql',
      commentDescriptions: true,
    },
  });
