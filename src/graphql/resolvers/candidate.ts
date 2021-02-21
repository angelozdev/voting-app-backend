import {
  Arg,
  Field,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { Candidate, CandidateTypes } from "../../models";
import { Errors } from "../../types";

/* ***************************** INPUTS ******************************* */

@InputType()
class UpdateCandidateFields {
  @Field(() => String, { nullable: true })
  firstname: string;

  @Field(() => String, { nullable: true })
  lastname: string;

  @Field(() => Int, { nullable: true })
  age: number;

  @Field(() => String, { nullable: true })
  slogan: string;

  @Field(() => Int, { defaultValue: 0, nullable: true })
  votes: number;
}

/* ************************** RESOLVERS ************************** */
@Resolver()
class CandidateResolver {
  /* QUERIES */
  @Query(() => [CandidateTypes])
  async getAllCandidates(): Promise<CandidateTypes[]> {
    return await Candidate.find({}).limit(20);
  }

  /* Mutations */
  @Mutation(() => String)
  async deleteCandidateById(@Arg("id") id: string): Promise<string> {
    const candidate = await Candidate.findById(id);

    if (!candidate) throw new Error(Errors.CANDIDATE_NOT_FOUND);

    return await Candidate.deleteOne(candidate).then(() => {
      return "Candidate was deleted successfully.";
    });
  }

  @Mutation(() => CandidateTypes)
  async updateCandidateById(
    @Arg("id") id: string,
    @Arg("input") input: UpdateCandidateFields
  ): Promise<CandidateTypes> {
    const candidate = await Candidate.findById(id);

    if (!candidate) throw new Error(Errors.CANDIDATE_NOT_FOUND);

    const { firstname, lastname, age, votes, slogan } = input;

    const fields = {
      firstname: firstname || candidate.firstname,
      lastname: lastname || candidate.lastname,
      age: age || candidate.age,
      votes: votes || candidate.votes,
      slogan: slogan || candidate.slogan,
    };

    const updatedCandidate = await Candidate.findByIdAndUpdate(id, fields, {
      new: true,
    });

    if (!updatedCandidate) throw new Error(Errors.CANDIDATE_NOT_FOUND);

    return updatedCandidate;
  }
}

export default CandidateResolver;
