import { Field, ID, Int, ObjectType } from "type-graphql";
import { Document, model, Schema } from "mongoose";

const CandidateSchema = new Schema(
  {
    firstname: {
      type: String,
      require: true,
      trim: true,
    },

    lastname: {
      type: String,
      require: true,
      trim: true,
    },

    age: {
      type: Number,
      require: true,
      trim: true,
    },

    slogan: {
      type: String,
      require: true,
      trim: true,
    },

    votes: {
      type: Number,
      default: 0,
    },

    avatar: {
      type: String,
      require: true,
    },
  },
  { timestamps: { updatedAt: true, createdAt: true } }
);

@ObjectType()
export class CandidateTypes extends Document {
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

  @Field(() => String)
  avatar: string;
}

export default model<CandidateTypes>(
  "Candidate",
  CandidateSchema,
  "candidates"
);
