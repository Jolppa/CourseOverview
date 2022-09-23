let express = require("express");
let colors = require("colors");
let { graphqlHTTP } = require("express-graphql");
const schema = require("./graphql/schema");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./util/db");

let app = express();

dotenv.config({ path: "./server/util/secret.env" });
app.use(cors());
connectDB();

const PORT = process.env.PORT || 5000;
const ENV = process.env.NODE_ENV;

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: ENV === "dev",
  })
);

app.listen(PORT, () => {
  console.log("Server is running on port 5000".yellow);
});
