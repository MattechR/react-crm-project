const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const users = require("./routes/users");
const auth = require("./routes/auth");
const cards = require("./routes/cards");
const app = express();
const http = require("http").Server(app);
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/my-rest-api")
  .then(() => console.log("connected to mongoDB"))
  .catch((err) => console.log("could not connect to mongoDB", err));

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/cards", cards);

const PORT = 3001;
http.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
