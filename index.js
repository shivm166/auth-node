import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import db from "./config/db.js";
import route from "./routes/authRoutes.js";
import cors from "cors";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/v1/user", route);

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await db();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to DB", error);
  }
};

startServer();
