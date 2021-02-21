import "reflect-metadata";
import { name, random, image } from "faker";
import connection from "../database";
import { Candidate } from "../models";

async function seedDB() {
  await connection();

  for await (const _ of Array(5)) {
    const newCandidate = {
      firstname: name.firstName(),
      lastname: name.lastName(),
      votes: random.number({ min: 0, max: 10 }),
      age: random.number({ min: 18, max: 90 }),
      slogan: random.words(10),
      avatar: image.people(500),
    };

    await Candidate.create(newCandidate)
      .then((candidate) => {
        console.log(`${candidate.firstname} was added correctly.`);
      })
      .catch(console.error);
  }

  process.exit(0);
}

seedDB();
