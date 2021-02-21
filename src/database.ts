import { connect, ConnectOptions } from "mongoose";
import config from "./config";

async function connection() {
  const {
    database: { name, password, username },
  } = config;
  const URI = `mongodb+srv://${username}:${password}@cluster0.uvtk5.mongodb.net/${name}?retryWrites=true&w=majority`;

  const options: ConnectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  };

  return connect(URI, options)
    .then(() => {
      console.log("DB CONNECTED");
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

export default connection;
