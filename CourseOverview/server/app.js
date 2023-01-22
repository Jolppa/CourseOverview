let express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./server/util/secret.env" });
const PORT = process.env.PORT || 5000;
const ENV = process.env.NODE_ENV || "demo";
let colors = require("colors");
let { graphqlHTTP } = require("express-graphql");
const schema = require("./graphql/schema");
const cors = require("cors");
const connectDB = require("./util/db");

let app = express();

app.use(cors());
if (ENV !== "demo") {
  connectDB();
}

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: ENV === "dev" ? true : false,
  })
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.yellow);
});
