const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");


app.use(express.json());
app.use(cookieParser());

/**
 * - Routes Required
 */
const authRouter = require("./routes/auth.routes");
const accountRouter = require("./routes/account.routes");

/**
 * - Use Routes
 */
app.use("/api/auth", authRouter);
app.use("/api/accounts", accountRouter);

module.exports = app;