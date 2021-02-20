import dotenv from "dotenv";

dotenv.config();

const config = {
  database: {
    name: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    username: process.env.DB_USERNAME,
  },
};

export default config;
