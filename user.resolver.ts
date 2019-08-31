import { Resolver, Query, Mutation } from 'type-graphql';

@Resolver()
export class UserResolver {
  @Query(returns => String)
  hello() {
    return 'hello';
  }

  @Mutation(returns => [String])
  aa() {
    return ['a'];
  }
}
