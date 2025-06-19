import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/connect.js";

dotenv.config();  //import dotenv items here

const app = express();

// 1. Body parser middleware (important!)
app.use(express.json());

app.get('/', async (req, res) => {
    app.render('Hello World!');
  });

 
  // Start the server
  const startServer = async () => {
    try {
      await connectDB(process.env.MONGODB_URL); // Don't forget the await
      app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`));
    } catch (error) {
      console.log(error);
    }
  };
  
  startServer();