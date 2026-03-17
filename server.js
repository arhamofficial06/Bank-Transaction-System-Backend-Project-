require("dotenv").config();
const app = require("./src/app");
const port = process.env.PORT;
const connectToDB = require("./src/config/db");

connectToDB();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
