import { Query, Resolver } from "type-graphql";

/* ************************** RESOLVERS ************************** */
@Resolver()
class CandidateResolver {
  /* QUERIES */
  @Query(() => String)
  async getAllCandidates() {
    return "Hola mundo :D";
  }
}

export default CandidateResolver;
