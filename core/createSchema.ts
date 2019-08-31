import { buildSchema } from 'type-graphql';
import { UserResolver } from '../user.resolver';

export const createSchema = async () =>
  await buildSchema({
    resolvers: [UserResolver],
  });
