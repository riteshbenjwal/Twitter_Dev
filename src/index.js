import express from "express";
import { connect } from "./config/database.js";
import apiRoutes from "./routes/index.js";
import bodyParser from "body-parser";
const app = express();
import { TweetRepository, UserRepository } from "./repository/index.js";
import LikeService from "./services/like-service.js";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", apiRoutes);
app.listen(3000, async () => {
  console.log("server started on port 3000");
  await connect();
  console.log("Mongo db connected");
});
