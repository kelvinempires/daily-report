import express from "express";
import cookieParser from "cookie-parser";
import "dotenv/config";
import dbConnection from "./db/conn.js";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";
import cors from "cors";

dbConnection();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());


app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "https://daily-report.vercel.app",
        "http://localhost:5176",
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // Allow cookies or authentication headers
  })
);


app.get("/", (req, res) => {
  res.json("hello from server");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json("Something broke!");
});

app.listen(PORT, () => {
  console.log(`server is running on port http://localhost:${PORT}`);
});
