import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

// database connection
import "./config/db.js"

// import routes
import authRoute from "./route/auth.js";
import userRoute from "./route/user.js";
import postRoute from "./route/post.js";

dotenv.config();

// initialize express app
const app = express();

// middlewares
app.use(cors());
app.use(bodyParser.json({ limit: "3mb", extended: true }));

// routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);

// listen to port
app.listen(process.env.PORT, () => {
    console.log(`This server listening on port: #${process.env.PORT}`);
})