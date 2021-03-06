import {
  Arg,
  Field,
  ID,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { Candidate, CandidateTypes } from "../../models";
import { Errors } from "../../types";
import { Max, Min } from "class-validator";

/* ***************************** INPUTS ******************************* */

@InputType()
class UpdateCandidateFields {
  @Field(() => String, { nullable: true })
  firstname: string;

  @Field(() => String, { nullable: true })
  avatar: string;

  @Field(() => String, { nullable: true })
  lastname: string;

  @Field(() => Int, { nullable: true })
  @Max(100)
  @Min(18)
  age: number;

  @Field(() => String, { nullable: true })
  slogan: string;

  @Field(() => Int, { nullable: true })
  @Max(20)
  @Min(0)
  votes: number;
}

/* ********************** ADDITIONAL OBJECT TYPES ************************* */
@ObjectType()
class TotalVotes {
  @Field(() => ID)
  _id: string;

  @Field(() => Int)
  totalCandidates: number;

  @Field(() => Int)
  totalVotes: number;
}

/* ************************** RESOLVERS ************************** */
@Resolver()
class CandidateResolver {
  /* QUERIES */
  @Query(() => [CandidateTypes])
  async getAllCandidates(): Promise<CandidateTypes[]> {
    return await Candidate.find({}).sort({ votes: -1 }).limit(20);
  }

  @Query(() => TotalVotes)
  async getTotalVotes(): Promise<TotalVotes> {
    return Candidate.aggregate<TotalVotes>([
      {
        $group: {
          _id: { $sum: 1 },
          totalVotes: { $sum: "$votes" },
          totalCandidates: { $sum: 1 },
        },
      },
    ]).then((data) => data[0]);
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

    const { firstname, lastname, age, votes, slogan, avatar } = input;

    const fields = {
      firstname: firstname || candidate.firstname,
      lastname: lastname || candidate.lastname,
      age: age || candidate.age,
      votes: votes || candidate.votes,
      slogan: slogan || candidate.slogan,
      avatar: avatar || candidate.avatar,
    };

    const updatedCandidate = await Candidate.findByIdAndUpdate(id, fields, {
      new: true,
    });

    if (!updatedCandidate) throw new Error(Errors.CANDIDATE_NOT_FOUND);

    return updatedCandidate;
  }
}

export default CandidateResolver;
