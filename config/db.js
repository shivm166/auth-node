import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGOURL = process.env.MONGO_URL;

const db = async () => {
  try {
    await mongoose.connect(MONGOURL);
    console.log("Mongodb connected");
  } catch (error) {
    console.log(error);
  }
};

export default db;
