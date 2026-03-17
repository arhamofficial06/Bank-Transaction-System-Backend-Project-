require("dotenv").config();
const app = require("./src/app");
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
