import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'
import dbConnection from './db/conn.js';
import authRouter from "./routes/authRoute.js"
import userRouter from './routes/userRoute.js';

dbConnection();
const app = express()
const PORT = process.env.PORT || 5000

const allowedOrigins = ["http://localhost:5173"];

app.use(express.json())
app.use(cookieParser())
app.use(cors({origin: allowedOrigins,credentials: true}))

app.get("/", (req, res) =>{res.send("hello from server")});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`server is running on port http://localhost:${PORT}`);
});
