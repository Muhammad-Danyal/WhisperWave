import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import usersRoutes from "./routes/user.route.js";
import connectdb from "./connection.js";
import { app, server } from "./socket/socket.js"

dotenv.config();
const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use(cookieParser())

//routes
app.use('/api/auth', authRoutes)
app.use("/api/messages",messageRoutes)
app.use("/api/users",usersRoutes)


server.listen(PORT,()=>{
    connectdb();
    console.log(`Server is listening at ${PORT}`)
});