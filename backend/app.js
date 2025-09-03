require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./routes/authroutes");
const propertyRoute = require("./routes/propertyRouter");
const messageRoute = require("./routes/messageroutes");
const ConnectDb = require("./config/db");

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use("/api", router);
app.use("/api", propertyRoute);
app.use("/api", messageRoute);

const PORT = process.env.PORT || 3000;
ConnectDb().then(() => {
  app.listen(PORT, () => {
    console.log(` Server is running on port ${PORT} `);
  });
});
