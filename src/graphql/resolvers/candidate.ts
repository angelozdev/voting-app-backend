import { Field, ID, Int, ObjectType, Query, Resolver } from "type-graphql";

/* ************************** OBJECTS TYPES ************************ */
@ObjectType()
class Candidate {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  firstname: string;

  @Field(() => String)
  lastname: string;

  @Field(() => Int)
  age: number;

  @Field(() => String)
  slogan: string;

  @Field(() => Int, { defaultValue: 0 })
  votes: number;
}

/* ************************** RESOLVERS ************************** */
@Resolver()
class CandidateResolver {
  /* QUERIES */
  @Query(() => String)
  async getAllCandidates() {
    return "Hola mundo";
  }
}

export default CandidateResolver;
