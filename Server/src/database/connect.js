import mongoose from "mongoose";

const connectDB = (url) => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(url)
    .then(() =>
      console.log("connected to mongoDB Your database is connected!!")
    )
    .catch((err) => {
      console.error("failed to connect with mongo");
      console.error(err);
    });
};

export default connectDB;
