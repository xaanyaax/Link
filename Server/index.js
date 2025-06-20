import express from "express";
import * as dotenv from "dotenv";
import connectDB from "./src/database/connect.js";
// import { protect } from middlewares/AuthMiddleware.js;

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  app.render("Hello World!");
});

// Start the server
const startServer = async () => {
  try {
    await connectDB(process.env.MONGODB_URL); // Don't forget the await
    app.listen(8080, () => console.log("Server started on port 8080"));
  } catch (error) {
    console.log(error);
  }
};

startServer();
